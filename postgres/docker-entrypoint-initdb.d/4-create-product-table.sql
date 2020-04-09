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
INSERT INTO PRODUCTS (name, image, description, price, active, shop_id, category_id) VALUES
('Cervesa Rosa blanca', 'https://a1.soysuper.com/cebf4d12d2f40630631e1c1198769420.1500.0.0.0.wmark.2ecbbbe0.jpg', 'Cervesa', 3.25, true, 1, 1),
('Llet AGAMA Sencera', 'https://www.agamagrangesdemallorca.com/sites/default/files/elemento/2018-12/LC%20LecheEPak1L%2028sep18%2001.jpg', 'Llet fabricada a Mallorca', 0.79, true, 1, 2);