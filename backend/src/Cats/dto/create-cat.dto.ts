import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCatDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsOptional()
    clicks?: number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    momCatId?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    dadCatId?: string;
}