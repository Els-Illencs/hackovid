import Axios from "axios";
import { User } from "../models/user/User";

export class LoginApiClient {
  async login(email: string, password: string): Promise<User> {
    try {
      const body = {
        email,
        password,
      };
      const res = await Axios.post(process.env.REACT_APP_API_URL + 'users/login', body);
      return userLogin2User(res.data);
    } catch ({ e }) {
      throw Error("Email or password incorrect");
    }
  }
}

const userLogin2User = (user: any): User => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    address: {
      address: user.address,
      latitude: undefined,
      longitude: undefined
    },
    phone: user.phone,
  }
}