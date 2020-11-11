import { ICat } from '../interfaces/cat.interface';

export class Cat implements ICat {
    id: string;
    name: string;
    clicks: number;
    parents: [ICat?, ICat?];

    constructor(dto: ICat) {
        this.id = dto.id;
        this.name = dto.name;
        this.clicks = dto.clicks || 0;
        this.parents = dto.parents || [];
    }
}