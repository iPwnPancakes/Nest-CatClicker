import { IUserRepository } from '../userRepository';
import { User } from '../../domain/User';
import { UserUsername } from '../../domain/UserUsername';
import { UserEmail } from '../../domain/UserEmail';

export class NestUserRepository implements IUserRepository {
    emailExists(userEmail: UserEmail): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    usernameExists(userUsername: UserUsername): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    getUserByUserId(userId: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

    getUserByUsername(username: string | UserUsername): Promise<User> {
        throw new Error('Method not implemented.');
    }

    getUserByEmail(email: string | UserEmail): Promise<User> {
        throw new Error('Method not implemented.');
    }

    save(user: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
