import {
    Body,
    Controller,
    HttpException,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { LogIn } from '../../useCases/logIn/LogIn';
import { IncorrectPasswordError, UserDoesNotExistError } from '../../useCases/logIn/LogInErrors';

@Controller('auth')
export class AuthenticationController {
    constructor(private logInUseCase: LogIn) {}

    @Post('/login')
    async logIn(
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<void> {
        try {
            const result = await this.logInUseCase.execute({ email, password });

            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    case UserDoesNotExistError:
                    case IncorrectPasswordError: {
                        throw new UnauthorizedException(
                            (error.errorValue() as UseCaseError).message,
                        );
                    }
                    default: {
                        throw new HttpException(
                            result.value.error.toString(),
                            500,
                        );
                    }
                }
            }
        } catch (err) {
            throw new HttpException(err.toString(), 500);
        }
    }
}
