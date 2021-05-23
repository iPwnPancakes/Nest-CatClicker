import { Context } from '@nuxt/types';
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import UserModule from './userStore';

export const actions = {
    async nuxtServerInit(store: Store<any>, { req }: Context) {
        const userStore: UserModule = getModule(UserModule, store);

        // Get cookie
        const cookie = new Cookie(req.headers.cookie);

        if (cookie) {
            // Get accessToken from cookie
            const accessToken = cookie.getProperty('sessionToken');

            if (accessToken) {
                // Get user from accessToken
                // Populate user in store
                await userStore.fetchUserFromAccessToken(accessToken);
            }
        }
    },
};

export const modules = {
    UserModule,
};

class Cookie {
    private properties: string[] = [];

    constructor(cookie?: string) {
        if (cookie) {
            this.properties = cookie.split('; ');
        }
    }

    getProperty(property: string): string | null {
        const sessionTokenRow = this.properties.find((row) => row.startsWith(property + '='));

        if (sessionTokenRow) {
            return sessionTokenRow.split('=')[1];
        }

        return null;
    }
}
