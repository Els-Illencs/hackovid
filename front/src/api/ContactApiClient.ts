import Axios from "axios";

export class ContactApiClient {
    async createContact(name: string, email: string, reason: string, message: string) {
        const body = {
            name,
            email,
            reason,
            message
        }

        await Axios.post(`${process.env.REACT_APP_API_URL}contacts`, body);
    }
}