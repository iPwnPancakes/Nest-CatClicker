import { User as UserDomainModel } from '../../domain/User';
import { UserUsername } from '../../domain/UserUsername';
import { UserEmail } from '../../domain/UserEmail';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/User.entity';
import { Repository } from 'typeorm';
import { UserMap } from '../../mappers/userMap';

@Injectable()
export class NestUserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async emailExists(userEmail: UserEmail): Promise<boolean> {
        const user = await this.userRepository.findOne({
            email: userEmail.value,
        });

        if (!user) {
            return false;
        }

        return true;
    }

    async usernameExists(userUsername: UserUsername): Promise<boolean> {
        const user = await this.userRepository.findOne({
            username: userUsername.value,
        });

        if (!user) {
            return false;
        }

        return true;
    }

    async getUserByUserId(userId: string): Promise<UserDomainModel> {
        const user = await this.userRepository.findOne({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        return UserMap.toDomain(user);
    }

    async getUserByUsername(
        username: string | UserUsername,
    ): Promise<UserDomainModel> {
        const usernameString =
            username instanceof UserUsername ? username.value : username;

        const user = await this.userRepository.findOne({
            username: usernameString,
        });

        if (!user) {
            throw new Error('User not found');
        }

        return UserMap.toDomain(user);
    }

    async getUserByEmail(email: string | UserEmail): Promise<UserDomainModel> {
        const emailString = email instanceof UserEmail ? email.value : email;

        const user = await this.userRepository.findOne({ email: emailString });

        if (!user) {
            throw new Error('User not found');
        }

        return UserMap.toDomain(user);
    }

    async save(user: UserDomainModel): Promise<void> {
        const userExists = await this.emailExists(user.email);

        if (!userExists) {
            const nestTypeOrmUser = await UserMap.toPersistence(user);
            await this.userRepository.save(nestTypeOrmUser);
        }
    }
}
