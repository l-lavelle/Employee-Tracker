DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT PRIMARY KEY auto_increment,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    FOREIGN KEY (role_id) 
    REFERENCES role(id) 
    ON DELETE SET NULL,
    CONSTRAINT fk_employee FOREIGN KEY (manager_id) REFERENCES employee(id) 
);
