import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestUserRepository } from '../../../../../../modules/Users/repositories/adapters/nestUserRepository';
import { ValidateUser } from '../../../../../../modules/Users/useCases/validateUser/ValidateUser';
import { User } from '../../typeorm/models/User.entity';
import { AuthenticationController } from './Authentication.controller';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [PassportModule, TypeOrmModule.forFeature([User])],
    controllers: [AuthenticationController],
    providers: [ValidateUser, LocalStrategy, NestUserRepository],
})
export class AuthenticationModule {}
