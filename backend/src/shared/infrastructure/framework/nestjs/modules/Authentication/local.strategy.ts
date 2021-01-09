import {
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUser } from '../../../../../../modules/Users/useCases/validateUser/ValidateUser';
import {
    UserDoesNotExistError,
    IncorrectPasswordError,
    MalformedEmailError,
} from '../../../../../../modules/Users/useCases/validateUser/ValidateUserErrors';
import { ValidateUserResponseDTO } from '../../../../../../modules/Users/useCases/validateUser/ValidateUserResponseDTO';
import { UnexpectedError } from '../../../../../core/AppError';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private validateUserUseCase: ValidateUser) {
        super({ usernameField: 'email' });
    }

    async validate(
        email: string,
        password: string,
    ): Promise<ValidateUserResponseDTO> {
        const result = await this.validateUserUseCase.execute({
            email,
            password,
        });

        if (!result.isRight()) {
            const error = result.value;

            switch (error.constructor) {
                case UserDoesNotExistError:
                case IncorrectPasswordError:
                case MalformedEmailError: {
                    throw new UnauthorizedException();
                }
                case UnexpectedError:
                default: {
                    throw new HttpException(
                        new UnexpectedError(error).error.toString(),
                        500,
                    );
                }
            }
        }

        return result.value.getValue();
    }
}
