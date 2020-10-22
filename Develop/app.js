const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMember = [];
function app(){
    function getManager(){
        inquirer.prompt([
            {
                type: "input",
                message: "What is the manager's name?",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is the manager's id?",
                name: "managerId"
            },
            {
                type: "input",
                message: "What is the manager's email",
                name: "managerEmail",
            },
            {   
                type: "input",
                message: "What is the manager's office number?",
                name: "officeNumber",
            }
        ]).then(function(response) {
            const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.officeNumber)
            teamMember.push(manager)
            addingNewMember()
        })
    }
    function getEngineer(){
        inquirer.prompt([
            {
                type: "input",
                message: "What is the engineer's name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "What is the engineer's id?",
                name: "engineerId"
            },
            {
                type: "input",
                message: "What is the engineer's email",
                name: "engineerEmail",
            },
            {   
                type: "input",
                message: "What is the github username?",
                name: "github",
            }
        ]).then(function(response) {
            const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.github)
            teamMember.push(engineer)
            addingNewMember()
        })
    }
    function getIntern(){
        inquirer.prompt([
            {
                type: "input",
                message: "What is the intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is the intern's id?",
                name: "internId"
            },
            {
                type: "input",
                message: "What is the intern's email",
                name: "internEmail",
            },
            {   
                type: "input",
                message: "What is the intern's school?",
                name: "school",
            }
        ]).then(function(response) {
            const intern = new Intern(response.internName, response.internId, response.internEmail, response.school)
            teamMember.push(intern)
            addingNewMember()
        })
    }
    function addingNewMember(){
        inquirer.prompt([
            {
                type: "checkbox",
                name: "selectEmployees",
                message: "Which employee?",
                choices: [
                    "engineer",
                    "intern",
                    "manager",
                    "done",
                ]
            }
        ]).then(function(response) {
            const role = response.selectEmployees
            if (role == "manager"){
                getManager()
            }
            else if (role == "engineer"){
                getEngineer()
            }
            else if (role == "intern"){
                getIntern()
            }
            else if (role == "done"){
                renderTeam()
            }
        })
    }
    addingNewMember()
}
function renderTeam(){
    fs.writeFileSync(outputPath, render(teamMember), "utf-8")
}
app();




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
