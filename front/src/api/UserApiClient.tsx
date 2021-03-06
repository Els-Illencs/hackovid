import Axios from "axios";
import { UserAddress } from "../models/user/UserAddress";
import { User } from "../models/user/User";

const USER_ADDRESS = 'user_address';
const USER = 'user';

export class UserApiClient {
  async register(name: string, surname: string, email: string, password: string, phone: string, address: string, ): Promise<number> {
    try {
      const body = {
        name,
        surname,
        email,
        password,
        phone,
        address,
      };
      const res = await Axios.post(process.env.REACT_APP_API_URL + 'users/register', body);
      return res.data.id;
    } catch ({ e }) {
      throw Error("Email or password incorrect");
    }
  }

  async saveUser(user: User | undefined): Promise<boolean> {
    if (!user) {
      localStorage.removeItem(USER);
    } else {
      localStorage.setItem(USER, JSON.stringify(user));
    }
    return true;
  }

  async getUser(): Promise<User | undefined> {
    const user = localStorage.getItem(USER);
    return user !== null ? JSON.parse(user) : undefined;
  }

  async saveUserAddress(userAddress: UserAddress | undefined): Promise<boolean> {
    localStorage.setItem(USER_ADDRESS, JSON.stringify(userAddress));
    return true;
  }

  async getStoredUserAddress(): Promise<UserAddress> {
    const localStorageUserAddressItem = localStorage.getItem(USER_ADDRESS);
    let userAddress: UserAddress = {
      address: "",
      latitude: 0,
      longitude: 0
    };
    if (localStorageUserAddressItem !== null) {
      userAddress = JSON.parse(localStorageUserAddressItem);
    }
    return userAddress;
  }
}