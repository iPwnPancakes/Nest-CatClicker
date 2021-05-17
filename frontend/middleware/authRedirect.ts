import { Middleware } from '@nuxt/types';
import { getModule } from 'vuex-module-decorators';
import UserModule from '~/store/userStore';

const authRedirectMiddleware: Middleware = ({ store, redirect, route }) => {
    if (route.path !== '/login') {
        const userModule: UserModule = getModule(UserModule, store);

        if (!userModule.user) {
            redirect(403, '/login');
        }
    }
};

export default authRedirectMiddleware;
