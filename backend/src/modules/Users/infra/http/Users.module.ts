import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/Owner.entity';
import { User } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/User.entity';
import { NestOwnerRepository } from '../../../CatGame/repositories/adapters/nestOwnerRepository';
import { AfterUserCreated } from '../../../CatGame/subscriptions/afterUserCreated';
import { CreateOwner } from '../../../CatGame/useCases/createOwner/CreateOwner';
import { NestUserRepository } from '../../repositories/adapters/nestUserRepository';
import { UserSubscriber } from '../../subscribers/UserSubscriber';
import { CreateUser } from '../../useCases/createUser/CreateUser';
import { GetUserByEmail } from '../../useCases/getUserByEmail/GetUserByEmail';
import { UsersController } from './Users.controller';

// TODO: Move AfteruserCreated event to an owner module
@Module({
    imports: [TypeOrmModule.forFeature([User, Owner])],
    controllers: [UsersController],
    providers: [
        CreateUser,
        NestUserRepository,
        GetUserByEmail,
        UserSubscriber,
        AfterUserCreated,
        CreateOwner,
        NestOwnerRepository,
    ],
})
export class UsersModule {}
