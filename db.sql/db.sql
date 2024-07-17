-- help \?

--list database \l

--create database  CREATE DATABASE database_name;

--list tables \d










CREATE TABLE products (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    on_sale boolean
);

INSERT INTO products (name, price, on_sale) values ('Peach Cobbler Whole Beans', 18, true);
INSERT INTO products (name, price, on_sale) values ('Cookie Dough Whole Beans', 17, true);
INSERT INTO products (name, price, on_sale) values ('Cranberry Slushy Whole Beans', 18, true);