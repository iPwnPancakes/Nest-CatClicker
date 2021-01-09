import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ValidateUserResponseDTO } from '../../../../../../modules/Users/useCases/validateUser/ValidateUserResponseDTO';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthenticationController {
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req): Promise<ValidateUserResponseDTO> {
        const user: ValidateUserResponseDTO = req.user;

        return user;
    }
}
