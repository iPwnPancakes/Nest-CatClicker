import { Context } from '@nuxt/types';

export function isAuthenticatedMiddleware(context: Context) {
    const cookieString = process.client ? document.cookie : context.req.headers.cookie;

    const sessionToken = new Cookie(cookieString).getProperty('sessionToken');

    if (sessionToken) {
        // get current user from session
        context.store.commit('setUser');
    }
}

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
