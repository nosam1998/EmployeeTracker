const inquirer = require("inquirer");
const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "toor",
    database: "employees",
    ssl: {
        // DO NOT DO THIS
        // set up your ca correctly to trust the connection
        rejectUnauthorized: false
    }
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


const mainPrompt = () => {
    inquirer.prompt([{
        type: "list",
        name: "mainAction",
        message: "What action would you like to perform?",
        choices: ["Add a Department", "View a Department", "Add a Role", "View a Role", "Add an Employee", "View an Employee", "Update an Employee role", "I'm done!"]
    }]).then((response) => {
        switch (response.mainAction) {
            case "Add a Department":
                addDepartment();
                break;
            case "View a Department":
                viewDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "View a Role":
                viewRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "View an Employee":
                viewEmployee();
                break;
            case "Update an Employee role":
                updateEmployee();
                break;
            case "Exit":
                endConnection();
                break;
            default:
                console.log("Something went wrong while selecting what you'd like to do!")
        }
    })
}

const toTable = (data) => {
    console.log("\n");
    console.table(data);
}

// Add Actions

const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the Department that you'd like to add?",
        name: "name"
    }]).then((response) => {
        let q = `INSERT INTO department VALUES(NULL, "${response.name}")`;

        connection.query(q, function (error, results, fields) {
            if (error) throw error;
            // else console.log(`Successfully added ${response.name} to the departments list!`);
        });

        mainPrompt();
    });
}


const addRole = () => {

    inquirer.prompt([{
            type: "input",
            message: "What is the job title of the role that you'd like to add?",
            name: "title",
        },
        {
            type: "input",
            message: "What is the salary for this job title?",
            name: "salary"
        },
        {
            type: "input",
            message: "What department ID does this job title belong to?",
            name: "department_id"
        }
    ]).then((response) => {
        let q = `INSERT INTO role VALUES(NULL, "${response.title}", ${response.salary}, ${response.department_id})`;

        connection.query(q, function (error, results, fields) {
            if (error) throw error;
            // else console.log(`Successfully added ${response.title} to the roles list!\n`);
        });

        mainPrompt();
    });
}


const addEmployee = () => {
    inquirer.prompt([{
            type: "input",
            message: "What is the first name of the employee?",
            name: "first_name",
        },
        {
            type: "input",
            message: "What is the last name of the employee",
            name: "last_name"
        },
        {
            type: "input",
            message: "What is the ID of the role for the employee",
            name: "role_id"
        }, {
            type: "input",
            message: "What is the ID of the manager for the employee",
            name: "manager_id"
        }
    ]).then((response) => {
        let q = `INSERT INTO employee VALUES(NULL, "${response.first_name}", "${response.last_name}", ${response.role_id}, ${response.manager_id})`;

        connection.query(q, function (error, results, fields) {
            if (error) throw error;
            // else console.log(`Successfully added ${response.first_name} to the employees list!`);
        });

        mainPrompt();
    });
}


// View Actions

const viewDepartment = () => {
    connection.query("SELECT * FROM department", function (error, results, fields) {
        if (error) throw error;
        toTable(results);
    });

    mainPrompt();
}


const viewRole = () => {
    connection.query("SELECT * FROM role", function (error, results, fields) {
        if (error) throw error;
        toTable(results);
    });

    mainPrompt();
}


const viewEmployee = () => {
    connection.query("SELECT * FROM employee", function (error, results, fields) {
        if (error) throw error;
        toTable(results);
    });

    mainPrompt();
}


// Update Actions

const updateEmployee = () => {
    inquirer.prompt([{
            type: "input",
            message: "What is the ID of the employee you'd like to update?",
            name: "employee_id",
        },
        {
            type: "input",
            message: "What is the ID of the role for the employee",
            name: "role_id"
        }
    ]).then((response) => {
        let q = `UPDATE employee SET role_id=${response.role_id} WHERE id=${response.employee_id}`;

        connection.query(q, function (error, results, fields) {
            if (error) throw error;
            // else console.log(`Successfully updated employee #${response.employee_id}!`);
        });

        mainPrompt();
    });
}


const endConnection = () => {
    connection.end()
}

// Driver Code
mainPrompt();