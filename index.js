const inquirer = require('inquirer');
const { viewDepartment,viewRoles,viewEmployees,addDepartment,addRole,addEmployee,updateEmployee } = require('./scripts/queries');


const startmenu =
[
    {type: "list",
    name: "startMenu",
    message: "Please choose an action to perform from the menu",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    }
]

function init() {
    inquirer.prompt(startmenu)
    .then((response)=>{
         switch(response.startMenu){
            case "View all departments": 
                viewDepartment(init)
                 break;
            case "View all roles": 
                viewRoles(init);
                break;
            case "View all employees":
                viewEmployees(init);
                break;
            case "Add a department":
                addDepartment(init);
                break;
            case "Add a role":
                addRole(init);
                break;
            case "Add an employee":
                addEmployee(init);
                break;
            case "Update an employee role":
                updateEmployee(init);
                break;
        }
    })   
};

init();



// comments
// README
// take out index??
// validate
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

// https://www.w3schools.com/sql/sql_foreignkey.asp
// https://pencilprogrammer.com/self-referencing-foreign-key-in-mysql/
// https://www.npmjs.com/package/mysql2
// https://blog.devart.com/types-of-relationships-in-sql-server-database.html#:~:text=So%2C%20what%20is%20one%2Dto,one%20record%20in%20table%201.
// https://dev.to/elhamnajeebullah/mysql-how-to-create-one-to-many-relationship-4gph
// https://selectfrom.dev/self-referencing-with-joins-in-sql-are-there-better-alternatives-acaac7155937

// https://www.mysqltutorial.org/mysql-foreign-key/
// https://medium.com/swlh/recursion-in-sql-explained-graphically-679f6a0f143b