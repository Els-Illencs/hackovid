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
        const res = await pool.query<Product>('SELECT id, name, image, description, price, active, category_id as categoryId, shop_id as shopId FROM products');

        return res.rows;
    }

    async getByCategory(categoryId: number) {
        const res = await pool.query<Product>('SELECT id, name, image, description, price, active, category_id as categoryId, shop_id as shopId FROM products WHERE category_id = ' + categoryId);

        return res.rows;
    }
    
    async getByName(name: string) {
        const searchName = name.replace(/\s/g, ' & ');
        console.log("Search name", [searchName]);
        const res = await pool.query<Product>(`
            SELECT id, name, image, description, price, active, category_id AS categoryId, shop_id AS shopId, score
                FROM (
                    SELECT ts_rank_cd(name_tokens, to_tsquery('${searchName}')) AS score, id, name, image, description, price, active, category_id, shop_id
                    FROM products
                ) S
            WHERE score > 0
            ORDER BY score DESC`);

        return res.rows;
    }
}