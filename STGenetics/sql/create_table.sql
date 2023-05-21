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
(1, 'Daisy', 'Holstein', '2019-07-15', 'Female', 2500.00, 1),
(2, 'Max', 'Angus', '2020-02-10', 'Male', 3000.00, 1),
(3, 'Luna', 'Hereford', '2018-11-28', 'Female', 2200.00, 1),
(4, 'Rocky', 'Limousin', '2021-05-03', 'Male', 2800.00, 1),
(5, 'Molly', 'Simmental', '2017-09-20', 'Female', 2400.00, 1),
(6, 'Buddy', 'Charolais', '2022-01-12', 'Male', 3200.00, 1),
(7, 'Lucy', 'Jersey', '2019-04-05', 'Female', 2600.00, 1),
(8, 'Charlie', 'Angus', '2020-08-18', 'Male', 3100.00, 1),
(9, 'Lola', 'Hereford', '2018-12-01', 'Female', 2300.00, 1),
(10, 'Cooper', 'Limousin', '2021-06-07', 'Male', 2700.00, 1),
(11, 'Daisy II', 'Holstein', '2020-03-25', 'Female', 2600.00, 1),
(12, 'Maximus', 'Angus', '2019-11-14', 'Male', 2900.00, 1),
(13, 'Lily', 'Hereford', '2017-06-08', 'Female', 2100.00, 1),
(14, 'Rex', 'Simmental', '2022-02-27', 'Male', 2600.00, 1),
(15, 'Misty', 'Charolais', '2018-09-10', 'Female', 2750.00, 1),
(16, 'Milo', 'Angus', '2021-01-08', 'Male', 2850.00, 1),
(17, 'Daisy III', 'Holstein', '2019-10-16', 'Female', 2550.00, 1),
(18, 'Oliver', 'Limousin', '2018-07-23', 'Male', 2900.00, 1),
(19, 'Coco', 'Hereford', '2022-03-29', 'Female', 2350.00, 1),
(20, 'Rocky II', 'Simmental', '2017-12-11', 'Male', 2650.00, 1);