import { IsNotEmpty, IsString } from "class-validator";

export class BreedCatDto {
    @IsString()
    @IsNotEmpty()
    momCatId: string;

    @IsString()
    @IsNotEmpty()
    dadCatId: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}