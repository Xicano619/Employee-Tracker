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
    (first_name, last_name, roles, manager_id)
VALUES
     ('Martin', 'Sillas', 'Software Engineer', 2),
    ('Aaron', 'Sillas', 'Lawyer', 1),
    ('Santos', 'Sillas', 'Account Manager', 1),
    ('Starr', 'Sillas', 'Legal Team Lead', 3),
    ('Michael', 'Sillas', 'Salesperson', 1),
    ('Brittani', 'Sillas', 'Software Engineer', 5),
    ('Carolina', 'Sillas', 'Lead Engineer', 6),
    ('Chapo', 'Sillas', 'Lawyer', 7);
