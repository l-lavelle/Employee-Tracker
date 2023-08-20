const inquirer = require('inquirer');
const { viewDepartment,viewRoles,viewEmployees,addDepartment } = require('./scripts/queries');


const startmenu =
[
    {type: "list",
    name: "startMenu",
    message: "Please choose an action to perform from the menu",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role","Exit"]
    }
]

function init() {
    inquirer.prompt(startmenu)
    .then((response)=>{
         switch(response.startMenu){
            case "View all departments": 
                 viewDepartment();
                 setTimeout(init, 2000);
                 break;
            case "View all roles": 
                viewRoles();
                setTimeout(init,2000);
                break;
            case "View all employees":
                viewEmployees();
                setTimeout(init,2000);
                break;
            case "Add a department":
                setTimeout(init,2000);
                addDepartment()
            case "Add a role":
            case "Add an employee":
            case "Update an employee role":
            case "Exit":
          
        }
    })      
};

init();


// https://www.npmjs.com/package/mysql2
// https://blog.devart.com/types-of-relationships-in-sql-server-database.html#:~:text=So%2C%20what%20is%20one%2Dto,one%20record%20in%20table%201.
// https://dev.to/elhamnajeebullah/mysql-how-to-create-one-to-many-relationship-4gph
// comments
// README

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

// https://www.w3schools.com/sql/sql_foreignkey.asp
// ALTER TABLE employee
//     ADD FOREIGN KEY (manager_id) 
//     REFERENCES employee(id) 
//     ON DELETE SET NULL;
