CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    lat float NOT NULL,
    lng float NOT NULL
);

CREATE INDEX shop_name_idx ON shops (name);
CREATE INDEX lat_lng_idx ON shops (lat, lng);

INSERT INTO SHOPS (name, lat, lng) VALUES ('Agromart', 39.5800973, 2.6495213);