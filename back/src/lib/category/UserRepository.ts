import pool from './PgConnectionPool';

export type User = {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export class UserRepository {
    async addUser(user: User) {
        const res = await pool.query<User>(`
            INSERT INTO users (name, surname, email, password, address, phone) VALUES 
            ('${user.name}', '${user.surname}', '${user.email}', '${user.password}', '${user.address}', '${user.phone}')
            RETURNING id;
        `);
        return res.rows[0];
    }

    async getUser(email: string, password: string) {
        const res = await pool.query<User>(`
            SELECT *
            FROM users
            WHERE email = '${email}' AND password = '${password}'
            LIMIT 1
        `);
        return res.rows[0];
    }
}