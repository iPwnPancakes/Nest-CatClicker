import { Module } from '@nestjs/common';
import { AuthenticationController } from './Authentication.controller';

@Module({
    controllers: [AuthenticationController],
})
export class AuthenticationModule {}
