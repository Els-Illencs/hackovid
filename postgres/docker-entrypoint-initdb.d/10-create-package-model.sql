CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    image text NOT NULL
);

CREATE TABLE package_items (
    id SERIAL PRIMARY KEY,
    package_id INTEGER REFERENCES packages(id) NOT NULL,
    keyword varchar(100) NOT NULL,
    quantity float NOT NULL
);


INSERT INTO packages (name, image) VALUES
('Els bàsics d''alimentació', 'https://p2.piqsels.com/preview/164/1019/791/beef-meat-soup-bouillon.jpg'),
('Pa amb oli', 'https://live.staticflickr.com/7455/14185012852_35ea1c757e_z.jpg'),
('Verdures i fruites de temporada', 'https://cdn.pixabay.com/photo/2016/10/22/15/35/fruits-1761031_960_720.jpg'),
('El pack de la torrada', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcOoTO1j58enX6pgUEwNxkxt99aU4AJLhsTjhvlzSc11Uki7H_&usqp=CAU');

INSERT INTO package_items (package_id, keyword, quantity) VALUES
(1, 'aigua', 1),
(1, 'llet', 1),
(1, 'pollastre', 0.5),
(1, 'porc', 0.5),
(1, 'poma', 0.25),
(1, 'plàtan', 0.40),
(1, 'patata', 1),
(1, 'ceba', 1),
(1, 'ous', 1),
(1, 'tomàtiga', 0.5),
(1, 'formatge', 0.25),
(1, 'pa', 1),
(2, 'pa', 2),
(2, 'oli', 1),
(2, 'tomàtiga', 0.5),
(2, 'formatge', 0.5),
(2, 'pernil', 0.5),
(2, 'olives', 1),
(3, 'carabassó', 0.5),
(3, 'albergínia', 0.5),
(3, 'ceba', 1),
(3, 'tomàtiga', 0.5),
(3, 'patates', 1),
(3, 'pastanaga', 0.5),
(3, 'pebrot verd', 0.5),
(3, 'pebrot vermell', 0.5),
(4, 'pollastre', 0.5),
(4, 'llom', 0.5),
(4, 'xistorra', 0.75),
(4, 'cansalada', 0.5),
(4, 'pebrot verd', 0.5),
(4, 'ceba', 3),
(4, 'patates', 3);