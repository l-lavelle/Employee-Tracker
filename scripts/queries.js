
const db = require("./connection");
const inquirer = require('inquirer');

function viewDepartment(){
    db.promise().query("SELECT * from department")
    .then( ([rows,fields]) => {
        rows.forEach((row)=>console.log(row.name))
        })
    // .then(()=>init());
};

function viewRoles(){
    db.promise().query("SELECT * from role")
    .then( ([rows,fields]) => {
        rows.forEach((row)=>console.log(row.title))
    })
};

function viewEmployees(){
    db.promise().query("SELECT * from employee")
    .then( ([rows,fields]) => {
        rows.forEach((row)=>console.log(`${row.first_name} ${row.last_name}`))
    })
};

function addDepartment(){
     inquirer.prompt(
        [
            {type:"input",
            name: "department",
            message:"Please enter new department you want to add\n"
            }
        ]
    ).then((response)=>{
        console.log(response.department)
        db.promise().query(`INSERT INTO department (name) 
            VALUES (?)`,response.department)
    })
};

module.exports={
    viewDepartment,
    viewRoles,
    viewEmployees,
    addDepartment
};