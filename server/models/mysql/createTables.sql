CREATE TABLE articulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    colection_code INT NOT NULL,
    img TEXT,
    price DECIMAL NOT NULL,
    group_code INT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE colecciones(
    id INT AUTO_INCREMENT PRIMARY KEY,
    colection_code INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    img TEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*
primeros dos digitos: año
y los siguientes digitos es por las edades(group_code)
*/

/*group_code:
3: recien nacidos
318: de 3 a 18 meses
140: 1 a 4 anios ninios
141: 1 a 4 anios nenas
4160: de 4 a 16 anios varon
4161: de 4 a 16 anios nena
1: accesorios
*/

INSERT INTO articulos (code, name, colection_code, img, price, group_code) VALUES 
    (24510, "enterito bebe algodón c/gorrito", 2403, ".\\view\\img\\24510.png", 3990.00, 3), 
    (24511, "enterito beba algodón c/gorrito", 2403, ".\\view\\img\\24511.png", 3990.00, 3),
    (24514, "enterito algodón c/gorrito", 2403, ".\\view\\img\\24511.png", 4690.00, 3),
    (24500, "enterito algodón pima premium c/gorrito", 2403, ".\\view\\img\\24500.png", 8190.00, 3);

