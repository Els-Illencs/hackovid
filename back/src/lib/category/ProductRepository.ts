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
    shopName: string
}

export class ProductRepository {
    async get() {
        const res = await pool.query<Product>('SELECT products.id, products.name, products.image, products.description, products.price, products.active, products.category_id as categoryId, products.shop_id as shopId, shops.name as shopName FROM products INNER JOIN shops ON products.shop_id = shops.id');

        return res.rows;
    }

    async getByCategory(categoryId: number) {
        const res = await pool.query<Product>('SELECT products.id, products.name, products.image, products.description, products.price, products.active, products.category_id as categoryId, products.shop_id as shopId, shops.name as shopName FROM products INNER JOIN shops ON products.shop_id = shops.id WHERE products.category_id = ' + categoryId);
        return res.rows;
    }
}