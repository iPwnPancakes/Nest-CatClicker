import { User } from '~/models/User';
import { HttpClient } from '../HttpClient';

export interface LoginDTO {
    username: String;
    password: String;
}

export async function Login(dto: LoginDTO): Promise<User> {
    const response = await HttpClient().post('/users/login', dto);

    try {
        return new User({ username: response.data.username });
    } catch (e) {
        throw Error('Invalid Response: ' + e.message);
    }
}
