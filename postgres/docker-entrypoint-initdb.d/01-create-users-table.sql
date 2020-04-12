CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    surname varchar(100) NOT NULL,
    email varchar(256) NOT NULL,
    password text NOT NULL,
    address text NOT NULL,
    phone varchar(30) NOT NULL
);

INSERT INTO users (name, surname, email, password, address, phone) VALUES 
    ('Admin', 'SurnameAdmin', 'admin@comacasa.com', 'admin', 'Carrer de Blanquerna, Palma, Spain', '666666666');
