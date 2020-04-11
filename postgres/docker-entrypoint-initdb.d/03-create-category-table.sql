CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    image text NOT NULL
);

CREATE UNIQUE INDEX categories_name_unique_idx ON categories (name);


INSERT INTO CATEGORIES (name, image) VALUES
('Fruita', 'https://cdn.pixabay.com/photo/2016/08/17/10/04/fruit-bowl-1600023_960_720.jpg'),
('Verdura', 'https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_960_720.jpg'),
('Pa', 'https://cdn.pixabay.com/photo/2020/03/22/16/18/bread-4957679_960_720.jpg'),
('Carn', 'https://cdn.pixabay.com/photo/2018/02/04/19/42/ham-3130701_960_720.jpg'),
('Peix', 'https://cdn.pixabay.com/photo/2016/08/24/17/02/fish-1617442_960_720.jpg'),
('Rebosteria', 'https://cdn.pixabay.com/photo/2020/04/02/19/32/croissant-4996516_960_720.jpg'),
('Lactis', 'https://cdn.pixabay.com/photo/2017/04/26/22/24/soy-milk-2263942_960_720.jpg'),
('Begudes', 'https://cdn.pixabay.com/photo/2016/03/27/18/47/beers-1283566_960_720.jpg'),
('Bricolatge', 'https://cdn.pixabay.com/photo/2015/07/28/20/55/tools-864983_960_720.jpg'),
('Il·luminació', 'https://cdn.pixabay.com/photo/2018/06/21/20/23/lamp-3489395_960_720.jpg'),
('Llibres', 'https://cdn.pixabay.com/photo/2015/03/26/09/44/books-690219_960_720.jpg'),
('Música', 'https://cdn.pixabay.com/photo/2016/11/21/12/59/electronics-1845272_960_720.jpg'),
('Decoració', 'https://cdn.pixabay.com/photo/2016/11/18/17/20/couch-1835923_960_720.jpg'),
('Roba i accessoris', 'https://cdn.pixabay.com/photo/2015/01/20/14/28/fashion-605508_960_720.jpg'),
('Altres', 'https://cdn.pixabay.com/photo/2016/12/22/12/54/pieces-of-the-puzzle-1925425_960_720.jpg');