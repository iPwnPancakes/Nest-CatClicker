import { IsNotEmpty, IsString } from "class-validator";

export class GetUserByEmailRouteDto {
    @IsString()
    @IsNotEmpty()
    email: string;
}