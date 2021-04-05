import { Login } from '../../../../../src/modules/Users/useCases/login/Login';
import { IUserRepository } from '../../../../../src/modules/Users/repositories/ports/userRepository';
import { IAuthService } from '../../../../../src/modules/Users/services/AuthService/authService';
import { ISessionService } from '../../../../../src/modules/Users/services/SessionService/ports/sessionService';
import { LoginDTO } from '../../../../../src/modules/Users/useCases/login/LoginDTO';
import { left, Result, right } from '../../../../../src/shared/core/Result';

describe('Login use case', () => {
    let userRepo: IUserRepository;
    let authService: IAuthService;
    let sessionService: ISessionService;

    let useCase: Login;

    beforeEach(async () => {
        userRepo = {
            exists: jest.fn(),
            emailExists: jest.fn(),
            usernameExists: jest.fn(),
            getUserByEmail: jest.fn(),
            getUserByUserId: jest.fn(),
            getUserByUsername: jest.fn(),
            save: jest.fn(),
        };

        authService = {
            validateUserCredentials: jest.fn(),
        };

        sessionService = {
            createUserSession: jest.fn(),
            deleteUserSession: jest.fn(),
            userHasSession: jest.fn(),
            getSessionIdByUser: jest.fn(),
            checkIfSessionExpired: jest.fn(),
        };

        useCase = new Login(userRepo, authService, sessionService);
    });

    it('Fails if invalid username', async () => {
        const dto: LoginDTO = {
            username: '',
            password: 'asdf',
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBe(true);
    });

    it('Fails if invalid password', async () => {
        const dto: LoginDTO = {
            username: 'asdfasdf',
            password: '',
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBe(true);
    });

    it('Fails if valid username and password but username doesnt exist', async () => {
        authService.validateUserCredentials = () =>
            Promise.resolve(left(Result.fail('Failing for test')));

        const dto: LoginDTO = {
            username: 'asdfasdf',
            password: 'asdfasdf',
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBe(true);
    });

    it('Creates a new session if credentials match and user exists', async () => {
        authService.validateUserCredentials = () =>
            Promise.resolve(right(Result.ok()));

        sessionService.userHasSession = jest.fn(async () => false);

        const dto: LoginDTO = {
            username: 'asdfasdf',
            password: 'asdfasdf',
        };

        await useCase.execute(dto);

        expect(sessionService.deleteUserSession).not.toHaveBeenCalled();
        expect(sessionService.createUserSession).toHaveBeenCalled();
    });

    it('Deletes session if credentials match, user exists, and user has session', async () => {
        authService.validateUserCredentials = () =>
            Promise.resolve(right(Result.ok()));

        sessionService.userHasSession = jest.fn(async () => true);

        const dto: LoginDTO = {
            username: 'asdfasdf',
            password: 'asdfasdf',
        };

        await useCase.execute(dto);

        expect(sessionService.deleteUserSession).toHaveBeenCalled();
        expect(sessionService.createUserSession).toHaveBeenCalled();
    });

    it('Returns successful result if credentials match and user exists', async () => {
        authService.validateUserCredentials = () =>
            Promise.resolve(right(Result.ok()));

        const dto: LoginDTO = {
            username: 'asdfasdf',
            password: 'asdfasdf',
        };

        const result = await useCase.execute(dto);

        expect(result.isRight()).toBeTruthy();
    });
});
