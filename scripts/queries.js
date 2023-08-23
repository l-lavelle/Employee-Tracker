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
    db.promise().query("SELECT r.id AS role_id, r.title, r.salary, d.name AS department from role AS r JOIN department AS d ON r.department_id = d.id")
    .then( ([rows,fields]) => {
        console.table(rows)
    })
    .then(restart)
};

// add managers to query!!!!!
function viewEmployees(restart){
    db.promise().query(
        `SELECT e.id AS employee_id, e.first_name, e.last_name, r.salary, r.title, CONCAT (manager.first_name,manager.last_name) AS manager
        FROM employee AS e 
        JOIN role AS r ON e.role_id = r.id
        JOIN department AS d ON r.department_id=d.id
        LEFT JOIN employee AS manager ON e.manager_id=manager.id
        `)
    .then( ([rows,fields]) => {
        console.table(rows)
    })
    .then(restart)
};

function addDepartment(restart){
     inquirer.prompt(
        [
            {type:"input",
            name: "department",
            message:"Please enter new department you want to add:\n"
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
        let dept_id= departmentObj.find(dept=>dept.name===response.department)
        let trial= dept_id.id

        db.promise().query(`INSERT INTO role (title, salary, department_id) 
            VALUES ('${response.role}','${response.salary}','${trial}')`)
            console.log(`${response.role} role has been added to database`)
            
    })
    .then(restart)
}


function addEmployee(restart){
    db.promise().query("SELECT first_name,last_name FROM employee")
    db.promise().query("SELECT MAX(id) from role")
    .then( ([rows,fields])=>
    console.log(rows)
    )
    
    // .then(
    //     inquirer.prompt(
    //     [
    //         {type:"input",
    //         name: "firstName",
    //         message:"Please enter first name of the employee:\n"
    //         },
    //         {type:"input",
    //         name:"lastName",
    //         message:"Please enter the last name of the employee:\n"
    //         },
    //     ]))
    // .then(restart)

}



const employeeArray=[]
function updateEmployee(restart){
    db.promise().query("SELECT first_name,last_name FROM employee")
    .then(([rows,fields]) => {
        rows.forEach((row)=>employeeArray.push(`${row.first_name} ${row.last_name}`))
    })
    db.promise().query("SELECT title,id from role")
    .then(([rows,fields])=>{
        const roles = rows.map(({ id, title }) => ({ name: title, value: id }));
        return roles;
    })
    .then(result=>{
        inquirer.prompt(
        [
            {
            type:"list",
            name:"name",
            choices:employeeArray,
            message:"Please choose which employee you want to update"
            },
            {type:"list",
            name: "role",
            choices: result,
            message:"Please choose which role you want to update the employee to:\n"
            }
            
        ])
    .then((response)=>{
        let arr=(response.name).split(" ")
        db.promise().query(`UPDATE employee SET role_id=${response.role} WHERE first_name='${arr[0]}' AND last_name='${arr[1]}'`)
        console.log(`${response.name} role has been updated`)
    })
    .then(restart)
    })
}

module.exports={
    viewDepartment,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee
};