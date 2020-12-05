import { IsNotEmpty, IsUUID } from "class-validator";

export class IncrementCatWsDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}