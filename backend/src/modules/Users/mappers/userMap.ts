import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Mapper } from '../../../shared/infrastructure/Mapper';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserUsername } from '../domain/UserUsername';
import { UserDTO } from '../dtos/userDTO';

export class UserMap implements Mapper<User> {
    public static toDTO(user: User): UserDTO {
        return {
            user_id: user.userId.id.toString(),
            username: user.username.value,
            email: user.email.value,
        };
    }

    public static toDomain(raw: any) {
        const userUsernameOrError = UserUsername.create({
            value: raw.username,
        });
        const userEmailOrError = UserEmail.create(raw.email);
        const userOrError = User.create(
            {
                username: userUsernameOrError.getValue(),
                email: userEmailOrError.getValue(),
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
            user_id: user.userId.id.toString(),
            email: user.email.value,
            username: user.username.value,
        };
    }
}
