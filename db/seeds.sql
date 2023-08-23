INSERT INTO department (name)
VALUES  ("Medical"),
        ("Financial"),
        ("HR");

INSERT INTO role (title, salary, department_id)
VALUES  ("Truama Surgeon","440181",1),
        ("General Surgeon","424500",1),
        ("Chief of Surgery","497246",1),
        ("Financial Analyst","64048",2),
        ("CFO","110000",2),
        ("HR Manager","56000",3),
        ("HR Coordinator","50150",3);
        
SET FOREIGN_KEY_CHECKS = 0;
INSERT INTO employee (first_name, last_name, role_id,manager_id)
Values ("Meridth","Grey",2,2),
        ("Richard","Weber",3,null),
        ("Owen","Hunt",1,2),
        ("April","Kepner",1,2),
        ("Warren","Smith",4,6),
        ("Sheldon","Cooper",5,null),
        ("Howard","Walowitz",6,null),
        ("Rajesh","Koothrappali",7,7),
        ("Amy","Fowler",4,6),
        ("Penny","London",7,7);
SET FOREIGN_KEY_CHECKS = 1;
