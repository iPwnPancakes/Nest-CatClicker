import { User } from '../../../../../src/modules/Users/domain/User';
import { UserEmail } from '../../../../../src/modules/Users/domain/UserEmail';
import { UserPassword } from '../../../../../src/modules/Users/domain/UserPassword';
import { UserUsername } from '../../../../../src/modules/Users/domain/UserUsername';
import { CreateUserDto } from '../../../../../src/modules/Users/infra/http/dtos/createUserRouteDto';
import { IUserRepository } from '../../../../../src/modules/Users/repositories/ports/userRepository';
import { CreateUser } from '../../../../../src/modules/Users/useCases/createUser/CreateUser';
import { UnexpectedError } from '../../../../../src/shared/core/AppError';

describe('CreateUser use case', () => {
    let fakeUser: User;
    let userRepo: IUserRepository;
    let useCase: CreateUser;

    beforeEach(async () => {
        userRepo = {
            exists: jest.fn(),
            emailExists: jest.fn(),
            usernameExists: jest.fn(),
            getUserByUsername: jest.fn(),
            getUserByEmail: jest.fn(),
            getUserByUserId: jest.fn(),
            save: jest.fn(),
        };

        fakeUser = User.create({
            username: UserUsername.create({ value: 'asdfasdf' }).getValue(),
            email: UserEmail.create('asdfasdf@asdfasdf.com').getValue(),
            password: UserPassword.create({ value: 'asdfasdf' }).getValue(),
        }).getValue();

        useCase = new CreateUser(userRepo);
    });

    it('Fails if invalid username', async () => {
        const dto: CreateUserDto = {
            username: '',
            email: fakeUser.email.value,
            password: fakeUser.password.props.value,
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
    });

    it('Fails if invalid email', async () => {
        const dto: CreateUserDto = {
            username: fakeUser.username.value,
            email: 'asdf',
            password: fakeUser.password.props.value,
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
    });

    it('Fails if invalid password', async () => {
        const dto: CreateUserDto = {
            username: fakeUser.username.value,
            email: fakeUser.email.value,
            password: '',
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
    });

    it('Creates a new user entity and passes it to IUserRepository.save', async () => {
        userRepo.emailExists = jest.fn(async () => false);
        userRepo.usernameExists = jest.fn(async () => false);
        userRepo.save = jest.fn(async (user: User) => {
            expect(user.email.equals(fakeUser.email)).toBeTruthy();
            expect(user.password.equals(fakeUser.password)).toBeTruthy();
            expect(user.username.equals(fakeUser.username)).toBeTruthy();
        });

        const dto: CreateUserDto = {
            username: fakeUser.username.value,
            email: fakeUser.email.value,
            password: fakeUser.password.props.value,
        };

        expect.assertions(4);

        const result = await useCase.execute(dto);

        expect(result.isRight()).toBeTruthy();
    });

    it('Fails if email exists', async () => {
        userRepo.emailExists = jest.fn(async () => true);
        userRepo.usernameExists = jest.fn(async () => false);

        const dto: CreateUserDto = {
            username: fakeUser.username.value,
            email: fakeUser.email.value,
            password: fakeUser.password.props.value,
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
    });

    it('Fails if username exists', async () => {
        userRepo.emailExists = jest.fn(async () => false);
        userRepo.usernameExists = jest.fn(async () => true);

        const dto: CreateUserDto = {
            username: fakeUser.username.value,
            email: fakeUser.email.value,
            password: fakeUser.password.props.value,
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
    });

    it('Fails with UnexpectedError if userRepo throws', async () => {
        userRepo.emailExists = jest.fn(async () => {
            throw new Error('Fake error');
        });

        const dto: CreateUserDto = {
            username: fakeUser.username.value,
            email: fakeUser.email.value,
            password: fakeUser.password.props.value,
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(UnexpectedError);
    });
});
