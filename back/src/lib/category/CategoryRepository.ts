import pool from './PgConnectionPool';

export type Category = {
    name: string,
    image: string
}

export class CategoryRepository {
    async get() {
        const res = await pool.query<Category>('SELECT name, image FROM categories');

        return res.rows;
    }
}