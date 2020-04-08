CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(256) NOT NULL,
    password text NOT NULL,
    address text NOT NULL,
    phone varchar(30) NOT NULL
)