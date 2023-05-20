CREATE TABLE Element (
    Id	INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    Breed VARCHAR(100),
    BirthDate DATE,
    Sex VARCHAR(10),
    Price DECIMAL(10, 2),
    Status BIT
);

INSERT INTO Element (Id, Name, Breed, BirthDate, Sex, Price, Status) VALUES
(null, 'KFC', 'Pollo', '2023-03-10', 'Male', 100.00, 1),
(null, 'Lucero', 'Caballo', '2023-03-10', 'Female', 200.00, 1),
(null, 'Pepe', 'Grillo', '2023-03-10', 'Male', 300.00, 1),
(null, 'Pepa', 'Cerdo', '2023-03-10', 'Female', 400.00, 1),
(null, 'Peter', 'Araña', '2023-03-10', 'Female', 600.00, 1),
(null, 'Batman', 'Murciélago', '2023-03-10', 'Female', 600.00, 1),
(null, 'Winnie', 'Oso', '2023-03-10', 'Male', 700.00, 1),

(null, 'Carlos', 'Gallo', '2023-03-10', 'Male', 100.00, 1),
(null, 'Andrés', 'Abeja', '2023-03-10', 'Female', 200.00, 1),
(null, 'Eustacio', 'Mantis', '2023-03-10', 'Male', 300.00, 1),
(null, 'Diego', 'Mosca', '2023-03-10', 'Female', 400.00, 1),
(null, 'Juan', 'Delfin', '2023-03-10', 'Female', 600.00, 1),
(null, 'Alejandro', 'Manati', '2023-03-10', 'Female', 600.00, 1),
(null, 'PEdro', 'Ballena', '2023-03-10', 'Male', 700.00, 1),

(null, 'Maximiliano', 'Zorro', '2023-03-10', 'Male', 100.00, 1),
(null, 'Mateo', 'Lobo', '2023-03-10', 'Female', 200.00, 1),
(null, 'Jhonatan', 'Toro', '2023-03-10', 'Male', 300.00, 1),
(null, 'Jhon', 'Ardilla', '2023-03-10', 'Female', 400.00, 1),
(null, 'Parker', 'Pez', '2023-03-10', 'Female', 600.00, 1),
(null, 'Sam', 'Oveja', '2023-03-10', 'Female', 600.00, 1),
(null, 'Celeste', 'Águila', '2023-03-10', 'Male', 700.00, 1);