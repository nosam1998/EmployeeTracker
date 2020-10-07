USE employees;

INSERT INTO department (name) VALUES ("Sales"),("Engineering"),("Finance"),("Legal");
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, (SELECT id FROM department where name = "Sales")),("Salesperson", 80000, (SELECT id FROM department where name = "Sales")), ("Lead Engineer", 150000, (SELECT id FROM department where name = "Engineering")),("Software Engineer", 120000, (SELECT id FROM department where name = "Engineering")),("Accountant", 125000, (SELECT id FROM department where name = "Finance")),("Legal Team Lead", 100000,(SELECT id FROM department where name = "Legal")),("Lawyer", 100000, (SELECT id FROM department where name = "Finance"));
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", (SELECT id FROM role where title = "Sales Lead")), ("Mike", "Chan",(SELECT id FROM role where title = "Salesperson")), ("Ashley", "Rodriguez",(SELECT id FROM role where title = "Lead Engineer")), ("Kevin", "Tupik",(SELECT id FROM role where title = "Software Engineer")), ("Malia", "Brown",(SELECT id FROM role where title = "Accountant")), ("Sarah", "Lourd",(SELECT id FROM role where title = "Legal Team Lead")), ("Tom", "Allen",(SELECT id FROM role where title = "Lawyer"));
UPDATE employee
SET manager_id = 3
WHERE id = 1;
UPDATE employee
SET manager_id = 3
WHERE id = 4;
UPDATE employee
SET manager_id = 6
WHERE id = 7;
UPDATE employee
SET manager_id = 1
WHERE id = 2;