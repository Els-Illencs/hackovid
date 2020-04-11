INSERT INTO users (name, surname, email, password, address, phone) VALUES
('Toni', 'Moya', 'toni.moya@gmail.com', 'test-user', 'test-address', '6666666666'),
('Joana', 'Tur', 'joana.tur@gmail.com', 'test-user', 'test-address', '6666666666'),
('Miqul', 'pons', 'miquel.pons@gmail.com', 'test-user', 'test-address', '6666666666');

INSERT INTO PRODUCT_REVIEW (user_id, product_id, rating, comment) VALUES
(1, 10, 5, '¡Ostia taronjes! Que en son de bones ses de soller'),
(2, 10, 3.3, 'No tenien molta blanquinor i no em curarà be els constipats'),
(1, 3, 4.7, 'Unes llimones àcides com deu mana'),
(3, 3, 5, 'Molt bones');