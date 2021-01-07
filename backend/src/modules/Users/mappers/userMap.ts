import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Mapper } from '../../../shared/infrastructure/Mapper';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { UserUsername } from '../domain/UserUsername';
import { UserDTO } from '../dtos/userDTO';

export class UserMap implements Mapper<User> {
    public static toDTO(user: User): UserDTO {
        return {
            id: user.userId.id.toString(),
            username: user.username.value,
            email: user.email.value,
            password: user.password.props.value
        };
    }

    public static toDomain(raw: any) {
        const userUsernameOrError = UserUsername.create({
            value: raw.username,
        });
        const userEmailOrError = UserEmail.create(raw.email);
        const userPasswordOrError = UserPassword.create(raw.password);

        const userOrError = User.create(
            {
                username: userUsernameOrError.getValue(),
                email: userEmailOrError.getValue(),
                password: userPasswordOrError.getValue()
            },
            new UniqueEntityId(raw.user_id),
        );

        if (userOrError.isFailure) {
            console.log(userOrError.error);
        }

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static async toPersistence(user: User): Promise<any> {
        return {
            id: user.userId.id.toString(),
            email: user.email.value,
            username: user.username.value,
            password: user.password.props.value
        };
    }
}
