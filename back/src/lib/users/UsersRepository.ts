import pool from './PgConnectionPool';

export type User = {
    name: string,
    company: string
}

export class UsersRepository {
    async getAll() {
        const res = await pool.query<User>('SELECT name, company FROM users');

        return res.rows;
    }
}