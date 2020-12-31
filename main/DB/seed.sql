INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales lead', 10000, 1),
    ('Salesperson', 80000, 2),
    ('Lead Engineer', 15000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Martin', 'Sillas', 1, NULL),
    ('Aaron', 'Sillas', 2, NULL),
    ('Santos', 'Sillas', 3, NULL),
    ('Starr', 'Sillas', 4, NULL),
    ('Michael', 'Sillas', 5, NULL),
    ('Brittani', 'Sillas', 6, NULL),
    ('Carolina', 'Sillas', 7, NULL);
