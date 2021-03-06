import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../../../../modules/Users/infra/http/Users.module';
import { UptimeModule } from './modules/Uptime/Uptime.module';
import { AppController } from './app.controller';

@Module({
    imports: [TypeOrmModule.forRoot(), UsersModule, UptimeModule],
    controllers: [AppController],
})
export class AppModule {}
