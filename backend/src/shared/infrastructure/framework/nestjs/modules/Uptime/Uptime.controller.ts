import { Controller, Get } from '@nestjs/common';
import { uptime } from 'process';
import { UptimeService } from './Uptime.service';
import { IUptimeService } from './UptimeService.interface';

@Controller('uptime')
export class UptimeController {
    private uptimeService: IUptimeService;

    constructor(uptimeService: UptimeService) {
        this.uptimeService = uptimeService;
    }
    
    @Get()
    getUptime(): string {
        return this.uptimeService.getUptimeMilliseconds().toString();
    }
}
