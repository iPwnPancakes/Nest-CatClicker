import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteDatabaseConnectionFactory } from '../../../../shared/infrastructure/framework/nestjs/providers/SqliteDatabaseValueProvider';
import { Owner } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/Owner.entity';
import { User } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/User.entity';
import { OwnerRepositoryProvider } from '../../../CatGame/infra/providers/ownerRepositoryProvider';
import { AfterUserCreated } from '../../../CatGame/subscriptions/afterUserCreated';
import { CreateOwner } from '../../../CatGame/useCases/createOwner/CreateOwner';
import { UserSubscriber } from '../../subscribers/UserSubscriber';
import { CreateUser } from '../../useCases/createUser/CreateUser';
import { GetUserByEmail } from '../../useCases/getUserByEmail/GetUserByEmail';
import { Login } from '../../useCases/login/Login';
import { AuthServiceProvider } from '../providers/authServiceProvider';
import { SessionServiceProvider } from '../providers/sessionServiceProvider';
import { UserRepositoryProvider } from '../providers/userRepositoryProvider';
import { UsersController } from './Users.controller';

// TODO: Move AfteruserCreated event to an owner module
@Module({
    imports: [TypeOrmModule.forFeature([User, Owner])],
    controllers: [UsersController],
    providers: [
        CreateUser,
        UserRepositoryProvider,
        GetUserByEmail,
        UserSubscriber,
        AfterUserCreated,
        CreateOwner,
        OwnerRepositoryProvider,
        Login,
        AuthServiceProvider,
        SessionServiceProvider,
        SqliteDatabaseConnectionFactory
    ],
})
export class UsersModule {}
