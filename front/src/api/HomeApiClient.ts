import Axios from "axios";

export class HomeApiClient {
    async getHomeMessage() {
        const res = await Axios.get(process.env.REACT_APP_API_URL!);

        return res.data as string;
    }
}