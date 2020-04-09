import pool from './PgConnectionPool';

export type Product = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    active: boolean,
    categoryId: number,
    shopId: number
}

export class ProductRepository {
    async get() {
        const res = await pool.query<Category>('SELECT id, name, image, description, price, active, category_id as categoryId, shop_id as shopId FROM products');

        return res.rows;
    }
}