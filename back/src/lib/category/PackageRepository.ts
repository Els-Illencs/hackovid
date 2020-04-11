import pool from './PgConnectionPool';

export type Product = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    active: boolean,
    categoryId: number,
    shopId: number,
    shopName: string,
    product_type_id: number,
    product_type_name: string,
    avg_rating: number,
    count_rating: number,
    shop_lat: number,
    shop_lng: number
}

export type Package = {
    id: number,
    name: string,
    image: string
    keyword?: string,
    quantity?: number
}


export class PackageRepository {
    async get() {
        const res = await pool.query<Package>(`SELECT id, name, image FROM packages`);

        return res.rows
    }
    
    async getPackagesProducts (packageId: number | null) {
        const res = await pool.query<Package>(`
            SELECT packages.id as id, packages.image as image, keyword, quantity
            FROM packages 
                INNER JOIN package_items ON packages.id = package_items.package_id
            WHERE package_id = ${packageId}
        `);

        return res.rows;
    }
}