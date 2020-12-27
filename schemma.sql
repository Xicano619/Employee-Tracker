
/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Drops the day_planner_db if it already exists --
DROP DATABASE IF EXISTS employee_tracker_db;

-- Create the database day_planner_db and specified it for use.
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- Create the table plans.
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) to HOLD deprment name,
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) to HOLD role title,
  salary DECIMAL to HOLD role salary,
  deprment_id INT to HOLD reference to dpearment role  belongs to,
  PRIMARY KEY (id)
);
CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) to HOLD employee first_name,
  last_name varchar(30) to HOLD employee last_name,
  role_id INT to HOLD reference to role employee has,
  manager_id INT to HOLD reference to another employee that manages the employee being Created. This field may be NULL if the employee has no manager,
  PRIMARY KEY (id)
);

-- -- Insert a set of records.
-- INSERT INTO plans (plan) VALUES ('Plan to fight a ninja.');

