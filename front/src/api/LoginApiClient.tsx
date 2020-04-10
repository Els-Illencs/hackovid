import Axios from "axios";
import { User } from "../models/user/User";

export class LoginApiClient {
  async login(email: string, password: string): Promise<User> {
    try {
      const body = {
        email,
        password,
      };
      const res = await Axios.post(process.env.REACT_APP_API_URL + 'login', body);
      return res.data;
    } catch ({ e }) {
      throw Error("Email or password incorrect");
    }
  }
}