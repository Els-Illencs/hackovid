import pool from './PgConnectionPool';

export type Contact = {
    name: string,
    email: string,
    reason: string,
    message: string,
}

export class ContactRepository {
    async create(contact : Contact) {
        return await pool.query<Contact>(`
            INSERT INTO contacts (name, email, reason, message) VALUES 
            ('${contact.name}', '${contact.email}', ${contact.reason}, '${contact.message}')
        `);
    }
}