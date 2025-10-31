const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let employees = [
    { name: "Alice", id: "E101" },
    { name: "Bob", id: "E102" },
    { name: "Charlie", id: "E103" }
];

function showMenu() {
    console.log('\nEmployee Management System');
    console.log('1. Add Employee');
    console.log('2. List Employees');
    console.log('3. Remove Employee');
    console.log('4. Exit');
    rl.question('\nEnter your choice: ', handleMenu);
}

function handleMenu(choice) {
    switch (choice) {
        case '1':
            addEmployee();
            break;
        case '2':
            listEmployees();
            break;
        case '3':
            removeEmployee();
            break;
        case '4':
            rl.close();
            break;
        default:
            console.log('Invalid choice.');
            showMenu();
    }
}

function addEmployee() {
    rl.question('Enter employee name: ', (name) => {
        rl.question('Enter employee ID: ', (id) => {
            employees.push({ name, id });
            console.log(`Employee ${name} added.`);
            showMenu();
        });
    });
}

function listEmployees() {
    console.log('\nEmployee List:');
    employees.forEach((emp, idx) => {
        console.log(`${idx + 1}. Name: ${emp.name}, ID: ${emp.id}`);
    });
    showMenu();
}

function removeEmployee() {
    rl.question('Enter ID of employee to remove: ', (removeId) => {
        const index = employees.findIndex(emp => emp.id === removeId);
        if (index !== -1) {
            const removed = employees.splice(index, 1);
            console.log(`Removed employee: ${removed[0].name}`);
        } else {
            console.log('Employee not found.');
        }
        showMenu();
    });
}

rl.on('close', () => {
    console.log('Goodbye!');
    process.exit(0);
});

showMenu();
