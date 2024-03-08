CREATE TABLE articulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    colection_code INT NOT NULL,
    img TEXT,
    price DECIMAL NOT NULL,
    group_code INT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sales INT UNSIGNED NOT NULL
);

CREATE TABLE colecciones(
    id INT AUTO_INCREMENT PRIMARY KEY,
    colection_code INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    img TEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*collection_code:
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

INSERT INTO articulos (code, name, colection_code, img, price, group_code, sales) VALUES 
    (24510, "enterito bebe algodón c/gorrito", 243, ".\\view\\img\\articles\\24510.png", 3990.00, 3, 20), 
    (24511, "enterito beba algodón c/gorrito", 243, ".\\view\\img\\articles\\24511.png", 3990.00, 3, 5),
    (24514, "enterito algodón c/gorrito", 243, ".\\view\\img\\articles\\24514.png", 4690.00, 3, 7),
    (24500, "enterito algodón pima premium c/gorrito", 243, ".\\view\\img\\articles\\24500.png", 8190.00, 3, 10),
    (24501, "enterito algodón pima premium estampado c/gorrito", 243, ".\\view\\img\\articles\\24501.png", 8190.00, 3, 4),
    (24515, "enterito algodón c/broches", 243, ".\\view\\img\\articles\\24515.png", 5990.00, 3, 4),
    (23622, "enterito micropolar c/cierre y capucha", 233, ".\\view\\img\\articles\\23622.png", 8990.00, 3, 7),
    (24507, "conjunto jardinero algodón c/body", 243, ".\\view\\img\\articles\\24507.png", 4090.00, 3, 15),
    (24513, "conjunto jardinero algodón c/body", 243, ".\\view\\img\\articles\\24513.png", 4290.00, 3, 4),
    (21520, "conjunto plush bordado", 213, ".\\view\\img\\articles\\21520.png", 5990.00, 3, 2),
    (24512, "conjunto 3 pzas esmerilado bordado c/gorrito", 243, ".\\view\\img\\articles\\24512.png", 6990.00, 3, 1),
    (24526, "conjunto 3 pzas: body y osito algodón c/chaleco corderito c/capucha forrada", 243, ".\\view\\img\\articles\\24526.png", 8990.00, 3, 20),
    (24505, "body algodón pima premium estampado", 243, ".\\view\\img\\articles\\24505.png", 5790.00, 3, 4),
    (24504, "pack: conjunto algodón estampado c/portachute", 243, ".\\view\\img\\articles\\24504.png", 4590.00, 3, 3),
    (24509, "pack 4 pzas algodón c/cajita", 243, ".\\view\\img\\articles\\24509.png", 4990.00, 3, 50),
    (24506, "pack 3 pzas varón y nena algodón PREMIUM, estampado DIGITAL", 243, ".\\view\\img\\articles\\24506.png", 6990.00, 3, 30),
    (24508, "pack 4 pzas algodón c/cajita", 243, ".\\view\\img\\articles\\24508.png", 4990.00, 3, 13),
    (24502, "conjunto 3 pzas algodón pima bordado", 243, ".\\view\\img\\articles\\24502.png", 4990.00, 3, 20),
    (24205, "pack 3 pzas algodón c/babero bordado", 243, ".\\view\\img\\articles\\24205.png", 4790.00, 3, 8),
    (24518, "ajuar algodón 5 pzas bordado c/picot", 243, ".\\view\\img\\articles\\24518.png", 8490.00, 3, 10),
    (24217, "ajuar 5 pzas algodón c/picot manga larga", 243, ".\\view\\img\\articles\\24217.png", 8490.00, 3, 42),
    (24503, "ajuar 4 pzas algodón pima premium c/picot en estuche c/cierre", 243, ".\\view\\img\\articles\\24503.png", 11490.00, 3, 37),
    (24216, "ajuar por 5 pzas algodón c/picot", 243, ".\\view\\img\\articles\\24216.png", 7590.00, 3, 27),
    (23500, "ajuar 5 pzas algodón", 233, ".\\view\\img\\articles\\23500.png", 8990.00, 3, 4),
    (23504, "camperita algodón matelase", 233, ".\\view\\img\\articles\\23504.png", 7290.00, 3, 16);


INSERT INTO colecciones (colection_code, name, img) values 
(244160, "colección 2024 - teens", "../img/collections/colection1.jpg"),
(243, "colección 2024 - Recien Nacidos", "../img/collections/243.jpg");
