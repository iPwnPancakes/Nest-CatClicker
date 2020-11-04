import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateCatDto {
    @IsInt()
    id: number;

    @IsNotEmpty()
    name: string;
}