import { UserAddress } from "../models/user/UserAddress";

const USER_ADDRESS = 'user_address';

export class UserApiClient {
  
  async saveUserAddress(userAddress: UserAddress | undefined): Promise<boolean> {
    localStorage.setItem(USER_ADDRESS, JSON.stringify(userAddress));
    return true;
  }

  async getStoredUserAddress() {
    const localStorageUserAddressItem = localStorage.getItem(USER_ADDRESS);
    let userAddress: UserAddress = {
        address: "",
        latitude: 0,
        longitude: 0
    };
    if(localStorageUserAddressItem != null) {
        userAddress = JSON.parse(localStorageUserAddressItem);
    }
    return userAddress as UserAddress;
  }
}