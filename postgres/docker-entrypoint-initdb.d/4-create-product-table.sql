CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id) NOT NULL,
    category_id INTEGER REFERENCES categories(id) NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    price float NOT NULL,
    active boolean NOT NULL DEFAULT TRUE
);

CREATE INDEX products_name_idx ON products (name);