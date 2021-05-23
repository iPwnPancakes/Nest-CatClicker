import { User } from '~/models/User';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { UsersModule } from '~/libs/CatClickerAPI/Users';
import { Login, LoginDTO } from '~/libs/CatClickerAPI/Users/Login';

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

    @Action({ rawError: true })
    async login(dto: LoginDTO) {
        const user: User = await Login(dto);

        this.setUser(user);
    }
}
