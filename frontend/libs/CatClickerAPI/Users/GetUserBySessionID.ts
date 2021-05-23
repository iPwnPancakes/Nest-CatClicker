import axios from 'axios';

interface GetUserBySessionIdDTO {
    sessionID: string;
}

interface GetUserBySessionIdResponseDTO {
    username?: string;
}

export async function GetUserBySessionID(dto: GetUserBySessionIdDTO): Promise<GetUserBySessionIdResponseDTO> {
    const response = await axios.get(process.env.CAT_CLICKER_API_URL + '/getUserFromAccessToken');

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }

    return {
        username: response.data?.username,
    };
}
