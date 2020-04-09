import { UserAddress } from "../models/user/UserAddress";

const USER_ADDRESS = 'user_address';

export class UserApiClient {
  
  async saveUserAddress(userAddress: UserAddress): Promise<boolean> {
    localStorage.setItem(USER_ADDRESS, JSON.stringify(userAddress));
    return true;
  }
}