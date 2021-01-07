import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/User.entity';
import { NestUserRepository } from '../../repositories/adapters/nestUserRepository';
import { CreateUser } from '../../useCases/createUser/CreateUser';
import { UsersController } from './Users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [CreateUser, NestUserRepository],
})
export class UsersModule {}