const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const choice = require('inquirer/lib/objects/choice');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

});



// array of questions for user
const questions = [{
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['add department', 'add role', 'add employees', 'view department', 'view roles', 'view employees', 'updated employee roles']
    }

];

function addDpt() {
    inquirer.prompt({
        type: 'input',
        message: 'What would you like to name the department?',
        name: 'department'
    }).then((data) => {

        console.log("Inserting a new department...\n");
        connection.query(
            "INSERT INTO department SET ?", {
                name: data.department
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                init();
            }
        );

    })
};

function addRoles() {
    inquirer.prompt([{
            type: 'input',
            message: 'What is the title?',
            name: 'title'

        },
        {
            type: 'input',
            message: 'What is the salary?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department id?',
            name: 'dpt_id'
        }
    ]).then((data) => {

        console.log("Inserting a new role...\n");
        connection.query(
            "INSERT INTO role SET ?", {
                title: data.title,
                salary: data.salary,
                department_id: data.dpt_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role inserted!\n");
                // Call init() AFTER the INSERT completes
                init();
            }
        );

    })
}
// Add employees function 
function addEmployee() {
    inquirer.prompt([{
            type: 'input',
            message: 'What is the employees first name?',
            name: 'first_name'

        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'last_name'

        },
        {
            type: 'list',
            message: 'What is the employees role?',
            name: 'roles',
            choices: ['Sales Lead', 'Salesperson', 'Software Engineer', 'Accountant', 'Legal Team', 'Lawyer']
        },
        
        {
            type: 'input',
            message: 'Who is the employees manager id?',
            name: 'manager_id'
        }
    ]).then((data) => {

        console.log("Inserting a new employee...\n");
        connection.query(
            "INSERT INTO employee SET ?", {
                first_name: data.first_name,
                last_name: data.last_name,
                roles: data.roles,
                manager_id: data.manager_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee inserted!\n");
                // Call init() AFTER the INSERT completes
                init();
            }
        );

    })
}

// view departments function
function viewDpt() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        init();
    });
}

// view role function
function viewRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        init();
    });
}
// view employee function
function viewEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        init();
    });
}

// //  update employees
// function updateEmployee() {
//     inquirer.prompt([{

//     }]).then(data) => {

//     }
//     console.log("Updating employees data...\n");
//     var query = connection.query(
//       "UPDATE employee SET ? WHERE ?",
//       [
//         {
//         roles: data.
//         },
//         {
//           (where)flavor: "Rocky Road"
//         }
//       ],
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " products updated!\n");
//         // Call deleteProduct AFTER the UPDATE completes
//         init();
//       }
//     );

// function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then((data) => {
                if (data.menu === 'add department') {
                    addDpt();
                } else if (data.menu === 'add role') {
                    addRoles();
                } else if (data.menu === 'add employees') {
                    addEmployee();
                    }else if (data.menu === 'view department') {
                        viewDpt();
                    }else if (data.menu === 'view roles') {
                        viewRole();
                    }else if (data.menu === 'view employees') {
                        viewEmployee();
                    // }else if (data.menu === 'update employees) {
                    //     addRoles();
                    }
                })
        }

    // function call to initialize program
    init();