import { Module } from '@nestjs/common';
import { UptimeController } from './Uptime.controller';
import { UptimeService } from './Uptime.service';

@Module({
    controllers: [UptimeController],
    providers: [UptimeService]
})
export class UptimeModule {}
