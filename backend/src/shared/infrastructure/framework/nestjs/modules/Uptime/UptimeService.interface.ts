export interface IUptimeService {
    readonly start_date: Date;

    getUptimeMilliseconds(): number;
}