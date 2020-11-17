import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCatDto {
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsInt()
    @IsOptional()
    clicks?: number;
}