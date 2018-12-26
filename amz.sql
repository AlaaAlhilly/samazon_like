DROP DATABASE IF EXISTS amz_product;

CREATE DATABASE amz_product;

USE amz_product;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    dep_id INT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);
CREATE TABLE customers(
    cus_id INT NOT NULL AUTO_INCREMENT,
    cus_firstname VARCHAR(50) NOT NULL,
    cus_lastname VARCHAR(50) NOT NULL,
    cus_email VARCHAR(100) NOT NULL,
    cus_phone VARCHAR(100) NOT NULL,
    PRIMARY KEY (cus_id)
);
CREATE TABLE track(
    item_id INT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('PS4',1,'GAMING',299.99,1000);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('XBOX',1,'GAMING',299.99,200);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('SONY TV',2,'ELECTRONICS',599.99,900);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('TOSHIBA TV',2,'ELECTRONICS',355.99,450);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('SAMSUNG TV 32',2,'ELECTRONICS',400.00,290);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('AOC TV 55',2,'ELECTRONICS',750.99,120);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('B T-SHIRT',3,'CLOTHING',32.99,90);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('BLUE C-JEANS',3,'CLOTHING',45.99,76);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('ASUS ZX-90',4,'LAPTOP',1599.99,130);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('ASUS DESKTOP ZY-50',5,'DESKTOP',1289.99,750);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('TOSHIBA Z30-C',4,'LAPTOP',496.99,159);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('HP NP-9',4,'LAPTOP',750.00,340);
INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUE('LENOVO YOGA',4,'LAPTOP',1200.00,500);

INSERT INTO track(item_id,department_name,stock_quantity) VALUE(1,'GAMING',0);
INSERT INTO track(item_id,department_name,stock_quantity) VALUE(2,'ELECTRONICS',0);
INSERT INTO track(item_id,department_name,stock_quantity) VALUE(3,'CLOTHING',0);
INSERT INTO track(item_id,department_name,stock_quantity) VALUE(4,'LAPTOP',0);
INSERT INTO track(item_id,department_name,stock_quantity) VALUE(5,'DESKTOP',0);


SELECT * FROM products;
SELECT * FROM track;