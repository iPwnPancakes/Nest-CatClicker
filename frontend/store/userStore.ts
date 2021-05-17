import { User } from '~/models/User';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { UsersModule } from '~/libs/CatClickerAPI/Users';

@Module({
    name: 'UserModule',
    stateFactory: true,
    namespaced: true,
})
export default class UserModule extends VuexModule {
    user?: User;

    @Mutation
    setUser(user: User) {
        this.user = user;
    }

    @Mutation
    unsetUser() {
        this.user = undefined;
    }

    @Action
    async fetchUserFromAccessToken(token: string) {
        const response = await UsersModule.GetUserBySessionID({ sessionID: token });

        this.user = new User({ username: response.username ?? '' });
    }
}
