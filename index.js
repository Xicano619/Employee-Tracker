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
        choices: ['View Employees', 'View Department', 'View Roles', 'Add Employees', 'Add Department', 'View Roles', 'Updated Employee Roles', 'Remove Employee']
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

// // //  update employees
function updateEmployee() {
    connection.query("UPDATE employee SET roles = ? WHERE employee.first_name = ? AND employee.last_name = ?", function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        init();
        removeEmployee();
      }
    );
}

// remove employee
function removeEmployee() {
     // query the database for all employees
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    inquirer.prompt ([{
        type: 'rawList',
        message: 'Which employee would you like to remove?',
        name: 'employee',
        choices:  function() {
            var choiceEmployees = [];
            for (var i = 0; i < results.length; i++) {
              choiceEmployees.push(results[i].first_name.last_name);
            }
            return choiceEmployees;
          },
    }]).then((data) => {
        console.log("Removing employee...\n");
        connection.query("DELETE FROM employee WHERE ?", {
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.roles,
            manager_id: data.manager_id
        },
        function(err, res) {
            if(err) throw err;  
            console.log(res.affectedRows + "employee deleted!\n");
            // Call removeEmployee AFTER the DELETE completes
            init();
            viewEmployee();
        });
    })
});
}
// function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then((data) => {
                if (data.menu === 'View Employees') {
                    viewEmployee();
                } else if (data.menu === 'View Department') {
                    viewDpt();
                } else if (data.menu === 'View Roles') {
                    viewRole();
                    }else if (data.menu === 'Add Employees') {
                        addEmployee();
                    }else if (data.menu === 'Add Department') {
                        addDpt();
                    }else if (data.menu === 'View Roles') {
                        addRoles();
                    }else if (data.menu === 'Updated Employee Roles') {
                        updateEmployee();
                    }else if (data.menu === 'Remove Employee') {
                        removeEmployee();
                    }
                })
        }

    // function call to initialize program
    init();