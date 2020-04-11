CREATE TABLE product_type (
    id SERIAL PRIMARY KEY,
    name varchar(20) NOT NULL
);

INSERT INTO product_type (name) VALUES
('Unitat'),
('Pes');

ALTER TABLE products ADD COLUMN product_type_id INTEGER REFERENCES product_type(id);

UPDATE products SET product_type_id = 1;

ALTER TABLE products ALTER COLUMN product_type_id SET NOT NULL;