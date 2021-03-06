import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserUsername } from '../../domain/UserUsername';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
    exists(userId: string): Promise<boolean>;
    emailExists(userEmail: UserEmail): Promise<boolean>;
    usernameExists(userUsername: UserUsername): Promise<boolean>;
    getUserByUserId(userId: string): Promise<User>;
    getUserByUsername(username: UserUsername | string): Promise<User>;
    getUserByEmail(email: UserEmail | string): Promise<User>;
    save(user: User): Promise<void>;
}
