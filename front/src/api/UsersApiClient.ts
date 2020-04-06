import Axios from "axios";

export type User = {
    name: string,
    company: string
}

export class UsersApiClient {
    async getAll() {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}users`);

        return res.data as User[];
    }
}