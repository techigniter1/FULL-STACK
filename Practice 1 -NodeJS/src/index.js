const readline = require("readline");
const { listEmployees, addEmployee, removeEmployee } = require("../app");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log(`\nEmployee Management System
            1. Add Employee
            2. List Employees
            3. Remove Employee
            4. Exit\n`);
  rl.question("Enter your choice: ", handleUserChoice);
}

function handleUserChoice(choice) {
  switch (choice.trim()) {
    case "1":
      rl.question("Enter employee name: ", (name) => {
        rl.question("Enter employee ID: ", (id) => {
          addEmployee(name.trim(), id.trim());
          showMenu();
        });
      });
      break;
    case "2":
      listEmployees();
      showMenu();
      break;
    case "3":
      rl.question("Enter employee ID to remove: ", (id) => {
        removeEmployee(id.trim());
        showMenu();
      });
      break;
    case "4":
      rl.close();
      console.log("Exiting Employee Management System...");
      break;
    default:
      console.log("Invalid choice. Please try again.");
      showMenu();
  }
}

module.exports = showMenu;

                                                                                                
