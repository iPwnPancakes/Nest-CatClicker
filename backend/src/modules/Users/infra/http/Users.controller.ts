import {
    Body,
    ConflictException,
    Controller,
    HttpException,
    Post,
} from '@nestjs/common';
import { CreateUser } from '../../useCases/createUser/CreateUser';
import { DuplicateUserError } from '../../useCases/createUser/CreateUserErrors';

@Controller('users')
export class UsersController {
    constructor(private createUserUseCase: CreateUser) {}

    @Post('/create')
    async createUser(
        @Body('email') email: string,
        @Body('username') username: string,
        @Body('password') password: string,
    ): Promise<void> {
        try {
            const result = await this.createUserUseCase.execute({
                email,
                username,
                password,
            });

            if (result.isLeft()) {
                const error = result.value;

                console.log(error);

                switch (error.constructor) {
                    case DuplicateUserError: {
                        throw new ConflictException(
                            (error as DuplicateUserError).errorValue().message,
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
