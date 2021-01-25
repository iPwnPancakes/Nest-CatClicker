import {
    Body,
    ConflictException,
    Controller,
    HttpException,
    NotFoundException,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { UserDTO } from '../../dtos/userDTO';
import { UserMap } from '../../mappers/userMap';
import { CreateUser } from '../../useCases/createUser/CreateUser';
import { DuplicateUserError } from '../../useCases/createUser/CreateUserErrors';
import { GetUserByEmail } from '../../useCases/getUserByEmail/GetUserByEmail';
import { UserWithEmailDoesNotExistError } from '../../useCases/getUserByEmail/GetUserByEmailErrors';
import { CreateUserDto } from './dtos/createUserRouteDto';
import { GetUserByEmailRouteDto } from './dtos/getUserByEmailRouteDto';

@Controller('users')
export class UsersController {
    constructor(
        private createUserUseCase: CreateUser,
        private getUserByEmailUseCase: GetUserByEmail,
    ) {}

    @Post('/getByEmail')
    async getUserByEmail(
        @Body(new ValidationPipe())
        getUserByEmailRouteDto: GetUserByEmailRouteDto,
    ): Promise<UserDTO> {
        try {
            const result = await this.getUserByEmailUseCase.execute(
                getUserByEmailRouteDto,
            );

            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    case UserWithEmailDoesNotExistError: {
                        throw new NotFoundException(
                            'User with email does not exist',
                        );
                    }
                    default: {
                        throw new HttpException(
                            result.value.error.toString(),
                            500,
                        );
                    }
                }
            } else {
                const user = result.value.getValue();

                return UserMap.toDTO(user);
            }
        } catch (err) {
            throw new HttpException(err.toString(), 500);
        }
    }

    @Post('/create')
    async createUser(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    ): Promise<void> {
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
