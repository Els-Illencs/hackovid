CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name varchar(100),
    email varchar(256),
    reason smallint NOT NULL,
    message text NOT NULL
);