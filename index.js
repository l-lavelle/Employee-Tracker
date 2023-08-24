// Import Modules 
const inquirer = require('inquirer');
const { viewDepartment,viewRoles,viewEmployees,addDepartment,addRole,addEmployee,updateEmployee } = require('./scripts/queries');

// Questions for Inquirer Prompt
const startmenu =
[
    {type: "list",
    name: "startMenu",
    message: "Please choose an action to perform from the menu",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    }
]

// Prompts user for input and calls functions
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


// Video
 

