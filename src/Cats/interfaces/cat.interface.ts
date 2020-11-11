export interface ICat {
    id: string;
    name: string;
    clicks: number;
    parents: [ICat?, ICat?];
}