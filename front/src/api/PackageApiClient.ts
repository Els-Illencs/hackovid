import Axios from "axios";
import { Package } from '../models/package/Package';
import { ProductShoppingCart } from '../models/product/Product';


export class PackageApiClient {
    async getPackages() {
        const res = await Axios.get(process.env.REACT_APP_API_URL + 'packages');

        return res.data as Package[];
    }
    
    async getPackageItem(packageId: number | null, userAddress) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}packages?packageId=${packageId}&lat=${userAddress.latitude}&lng=${userAddress.longitude}`);

        return res.data as ProductShoppingCart[];
    }
}