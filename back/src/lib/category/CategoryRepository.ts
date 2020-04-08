import pool from './PgConnectionPool';

export type Category = {
    id: number,
    name: string,
    image: string
}

export class CategoryRepository {
    async get() {
        const res = await pool.query<Category>('SELECT id, name, image FROM categories');

        return res.rows;
    }
}