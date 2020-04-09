CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id) NOT NULL,
    category_id INTEGER REFERENCES categories(id) NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    price float NOT NULL,
    active boolean NOT NULL DEFAULT TRUE,
    name_tokens TSVECTOR NOT NULL
);

CREATE INDEX name_tokens_idx ON products USING gin(name_tokens);

INSERT INTO PRODUCTS (name, image, description, price, active, shop_id, category_id, name_tokens) VALUES
('Cervesa Rosa blanca', 'https://a1.soysuper.com/cebf4d12d2f40630631e1c1198769420.1500.0.0.0.wmark.2ecbbbe0.jpg', 'Cervesa artesanal de la marca Rosa Blanca (caixa de 6)', 3.25, true, 1, 1, to_tsvector('Cervesa Rosa blanca. Cervesa artesanal de la marca Rosa Blanca (caixa de 6)')),
('Llet blanca AGAMA Sencera', 'https://www.agamagrangesdemallorca.com/sites/default/files/elemento/2018-12/LC%20LecheEPak1L%2028sep18%2001.jpg', 'Llet fabricada a Mallorca', 0.79, true, 1, 2, to_tsvector('Llet AGAMA Sencera. Llet fabricada a Mallorca'));