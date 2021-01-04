import { Provider } from "@nestjs/common";
import { NestUserRepository } from "../../../../../../../modules/Users/repositories/implementations/nestUserRepository";

export const UserRepositoryProvider: Provider = {
    provide: 'UserRepository',
    useClass: NestUserRepository,
};