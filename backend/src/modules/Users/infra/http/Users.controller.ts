import {
    Body,
    ConflictException,
    Controller,
    HttpException,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUser } from '../../useCases/createUser/CreateUser';
import { DuplicateUserError } from '../../useCases/createUser/CreateUserErrors';
import { CreateUserDto } from './dtos/createUserDto';

@Controller('users')
export class UsersController {
    constructor(private createUserUseCase: CreateUser) {}

    @Post('/create')
    async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto ): Promise<void> {
        try {
            const result = await this.createUserUseCase.execute(createUserDto);

            if (result.isLeft()) {
                const error = result.value;

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
