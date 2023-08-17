const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       // MySQL password
//       password: 'MSU#code1',
//       database: ''
//     },
//     console.log(`Connected to the classlist_db database.`)
//   );

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
        // console.log(response.startMenu)
        if (response.startMenu==="View all departments"){
        console.log('response.startmenu')}
        else{
            console.log('hi')
        }
    })       
}

// init()

// https://www.npmjs.com/package/mysql2
// comments
// README
