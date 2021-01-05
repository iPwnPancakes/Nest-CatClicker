import { Injectable } from '@nestjs/common';
import { IUptimeService } from './UptimeService.interface';

@Injectable()
export class UptimeService implements IUptimeService {
    public readonly start_date: Date;

    constructor() {
        this.start_date = new Date();
    }

    public getUptimeMilliseconds(): number {
        return new Date().getTime() - this.start_date.getTime();
    }
}