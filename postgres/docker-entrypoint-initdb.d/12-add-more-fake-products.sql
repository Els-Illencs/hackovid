INSERT INTO PRODUCTS (name, image, description, price, active, shop_id, category_id, product_type_id, name_tokens) VALUES
('Aigua', 'https://cdn.pixabay.com/photo/2017/02/05/12/31/lemons-2039830_960_720.jpg', 'Botella d''aigua de 1''5L', 0.32, true, 2, 1, 1, to_tsvector('Aigua. Botella d''aigua de 1''5L. Begudes. Agua. Aigua 1,5 litres')),
('Garrafa d''aigua', 'https://cdn.pixabay.com/photo/2020/04/03/11/28/water-4998513_960_720.png', 'Garrafa d''aigua de 5L', 9.3, true, 2, 4, 2, to_tsvector('Garrafa d''aigua. Garrafa d''aigua de 5L. Begues. Agua. Aigua 5 litres'));