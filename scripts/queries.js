
const db = require("./connection");
const inquirer = require('inquirer');


function viewDepartment(restart){
    return db.promise().query("SELECT * from department")
    .then( ([rows,fields]) => {
            console.table(rows)                    
        })
    .then(restart)
};

function viewRoles(restart){
    db.promise().query("SELECT r.id,r.title,r.salary,d.name AS department from role AS r JOIN department AS d ON r.department_id = d.id")
    .then( ([rows,fields]) => {
        console.table(rows)
        // rows.forEach((row)=>console.log(row.title))
    })
    .then(restart)
};

// fix table
function viewEmployees(restart){
    db.promise().query(`SELECT e.id, e.first_name, e.last_name, r.salary, r.title from employee AS e 
        JOIN role as r ON e.role_id = r.id
        JOIN `)
    //  , departments,  and managers that the employees report to
    .then( ([rows,fields]) => {
        rows.forEach((row)=>console.log(`${row.first_name} ${row.last_name}`))
    })
    .then(restart)
};

function addDepartment(restart){
     inquirer.prompt(
        [
            {type:"input",
            name: "department",
            message:"Please enter new department you want to add\n"
            }
        ]
    ).then((response)=>{
        db.promise().query(`INSERT INTO department (name) 
            VALUES (?)`,response.department)
            console.log(`${response.department} has been added to departments`)
    })
    .then(restart)
};

// clean code 
let departmentObj={}
function addRole(restart){
    db.promise().query("SELECT * from department")
    .then( ([rows,fields]) => {
        departmentObj=rows.map(({id,name})=>({name:name, id:id}))
        const departmentArray=[];
        rows.forEach((row)=>departmentArray.push(row.name));
        return departmentArray;
        // return rows.map(({id,name})=>({name:name, id:id}))
        })
    .then(result=>{
        return inquirer.prompt(
        [
            {type:"input",
            name: "role",
            message:"Please enter new role you want to add:\n"
            },
            {type:"input",
            name:"salary",
            message:"Please enter the salary amount for the role:\n"
            },
            {type:"list",
            name:"department",
            choices: result,
            message:"Please choose which department the role is under:\n"}
        ])
    })
    .then((response)=>{
        console.log(response);
        console.log(departmentObj)
        let dept_id= departmentObj.find(dept=>dept.name===response.department)
        console.log(dept_id.id)
        let trial= dept_id.id

        db.promise().query(`INSERT INTO role (title, salary, department_id) 
            VALUES ('${response.role}','${response.salary}','${trial}')`)
            console.log(`${response.role} role has been added to database`)
            
    })
    .then(restart)
}


function addEmployee(){

}

function updateEmployee(){

}

module.exports={
    viewDepartment,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole
};