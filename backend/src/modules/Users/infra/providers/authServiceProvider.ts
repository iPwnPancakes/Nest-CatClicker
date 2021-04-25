import { Provider } from '@nestjs/common';
import {
    AuthService,
    IAuthService,
} from '../../services/AuthService/authService';

export const AuthServiceProvider: Provider = {
    provide: IAuthService,
    useClass: AuthService,
};
