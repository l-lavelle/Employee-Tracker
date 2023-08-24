// Import Modules
const db = require("./connection");
const inquirer = require('inquirer');

// Get all departments and return as table
function viewDepartment(restart){
    return db.promise().query("SELECT * from department")
    .then( ([rows,fields]) => {
            console.table(rows)                    
        })
    .then(restart)
};

// Get all data for roles and return as table 
function viewRoles(restart){
    db.promise().query("SELECT r.id AS role_id, r.title, r.salary, d.name AS department from role AS r JOIN department AS d ON r.department_id = d.id")
    .then( ([rows,fields]) => {
        console.table(rows)
    })
    .then(restart)
};

// Get all employee data and return table 
function viewEmployees(restart){
    db.promise().query(
        `SELECT e.id AS 
        employee_id, 
        e.first_name, 
        e.last_name, 
        r.salary, 
        r.title, 
        CONCAT (manager.first_name," ",manager.last_name) AS manager
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

// Add a department to database 
function addDepartment(restart){
     inquirer.prompt(
        [
            {type:"input",
            name: "department",
            message:"Please enter new department you want to add:\n",
            validate: function(department){
                if (department.trim()===""){
                    return console.log("Please enter a department name")
                } else {
                    return true
                }
            }}
        ]
    ).then((response)=>{
        db.promise().query(`INSERT INTO department (name) 
            VALUES (?)`,response.department)
            console.log(`${response.department} has been added to departments`)
    })
    .then(restart)
};

// Add a role to database
let departmentObj={}
function addRole(restart){
    db.promise().query("SELECT * from department")
    .then( ([rows,fields]) => {
        departmentObj=rows.map(({id,name})=>({name:name, id:id}))
        const departmentArray=[];
        rows.forEach((row)=>departmentArray.push(row.name));
        return departmentArray;
        })
    .then(result=>{
        return inquirer.prompt(
        [
            {type:"input",
            name: "role",
            message:"Please enter new role you want to add:\n",
            validate:function(role){
                if(role.trim()===""){
                    return console.log("Please enter a role")
                }else{
                    return true
                }
            } 
            },
            {type:"input",
            name:"salary",
            message:"Please enter the salary amount for the role:\n",
            validate: function(salary){
                if(salary.trim()===""){
                    return console.log("Please enter salary amount")
                }else{
                    return true
                }
            }
            },
            {type:"list",
            name:"department",
            choices: result,
            message:"Please choose which department the role is under:\n"}
        ])
    })
    .then((response)=>{
        let dept= departmentObj.find(dept=>dept.name===response.department)
        let dept_id= dept.id

        db.promise().query(`INSERT INTO role (title, salary, department_id) 
            VALUES ('${response.role}','${response.salary}','${dept_id}')`)
            console.log(`${response.role} role has been added to database`)
            
    })
    .then(restart)
}

// Query database for role id and title create array and object 
const rolesArray=[]
let roleObj
function getRoles(){
    db.promise().query("SELECT id,title from role")
    .then(([rows,fields]) => {
         roleObj = rows.map(({ id, title }) => ({ name: title, id: id }));
         rows.forEach((row)=>rolesArray.push(row.title));
    })
}

// Query database for mangaer name and id create array and object 
const managerArray = []
let managerObj
function getManager(){
    db.promise().query("SELECT first_name, last_name, id from employee")
    .then(([rows,fields]) => {
        managerObj = rows.map(({ first_name, last_name, id }) => ({ name:`${first_name} ${last_name}`, id: id }));
        rows.forEach((row)=>managerArray.push(`${row.first_name} ${row.last_name}`));
    })
}

// Add new employee to the database 
function addEmployee(restart){
    getRoles();
    getManager();
    inquirer.prompt(
        [
            {type:"input",
            name: "firstName",
            message:"Please enter first name of the employee:\n",
            validate: function(firstName){
                if(firstName.trim()===""){
                    return console.log("Please enter first name of employee")
                }else{
                    return true
                }
            }
            },
            {type:"input",
            name:"lastName",
            message:"Please enter the last name of the employee:\n",
            validate: function(lastName){
                if(lastName.trim()===""){
                    return console.log("Please enter a last name of the employee")
                }else{
                    return true
                }
            }
            },
            {
            type:"list",
            name:"roles",
            choices: rolesArray,
            message:"Please choose a role for employee"
            },
            {
            type:"list",
            name:"manager",
            choices:managerArray,
            message:"Please choose the manager for new employee"
            }
        ])
        .then((response)=>{
            let role_name= roleObj.find(role=>role.name===response.roles)
            let role_id=role_name.id
            let manager_name= managerObj.find(manager=>manager.name===response.manager)
            let manager_id= manager_name.id
            db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ('${response.firstName}','${response.lastName}','${role_id}','${manager_id}')`)
            console.log(`${response.firstName} ${response.lastName} has been added to database as an employee`)
        })
        .then(restart)

}

// Update an employee role in database 
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