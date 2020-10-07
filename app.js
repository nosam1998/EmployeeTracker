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
            case "I'm done!":
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

}


const addRole = () => {

}


const addEmployee = () => {

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

}


const endConnection = () => {
    connection.end()
}

// Driver Code
mainPrompt();