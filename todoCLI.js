// todoCLI.js

const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

/* todo = [
    {item_1: completed?},
    {item_2: completed?},
    .
    .
    .
    {item_n: completed?}
]

Completed values are 1 = yes and 0 = no
*/

// Creating a test list
var todo = [
    {"Make a coffee": 1},
    {"Finish homework": 1},
    {"Order a Tesla Model X": 0},
    {"Dance to Dua Lipa": 0}
]

// Defining a view-menu function
const menu = "(v) View \u2022 (n) New \u2022 (cX) Complete \u2022 (dX) Delete \u2022 (q) Quit"
function viewMenu() {
    console.log(menu)
    rl.prompt()
}

// Defining a function to display the todo list
function displayTodo() {
    todo.forEach(obj => {
        if (Object.values(obj) == 1) { // If the value of the item is 1, then print with checkmark
            console.log(todo.indexOf(obj) + "[\u2713]" + Object.keys(obj))
        } else { // If the value of the item is 0, then print without checkmark
            console.log(todo.indexOf(obj) + "[ ]" + Object.keys(obj))
        }
    })
    viewMenu()
}

// Defining "add new item" function
function addItem() {
    return new Promise((resolve, reject) => {
        rl.question('What would you like to add?\n> ', answer => {
            if (answer.length === 0) {
                reject("Not a valid input.")
            } else {
                obj = {}
                obj[answer] = 0
                todo.push(obj)
                resolve(answer)
            }
        })
    })
}

// Defining a function to mark an item as complete (i.e., set the value of the object to 1)
function completeItem(x) {
    id = x.split('')[1]
    obj = todo[id]
    item = Object.keys(obj)
    obj[item] = 1
    console.log(`"${item}" has been completed!`)
    viewMenu()
}

// Defining a function to delete items from the list
function deleteItem(x) {
    id = x.split('')[1]
    obj = todo[id]
    item = Object.keys(obj)
    todo.splice(id, 1)
    console.log(`"${item}" has successfully been deleted!`)
    viewMenu()
}

// Creating greeting screen
console.log("Welcome to Todo CLI!\n---------------\n" + menu)
rl.setPrompt('> ')
rl.prompt()

rl.on("line", response => {
        if (response.toLowerCase() === "v") { // View list
            displayTodo()
        }
        else if (response.toLowerCase() === "n") { // Add new item
            addItem()
            .then((result) => {
                console.log(`"${result}" has successfully been added!`)
                viewMenu()
            })
            .catch((err) => {
                console.log("Error: " + err)
                viewMenu()
            })
        }
        else if (/c\d/i.test(response)) { // Complete an item
            completeItem(response)
        }
        else if (/d\d/i.test(response)) { // Delete an item
            deleteItem(response)
        }
        else if (response === "q") { // Quit the program
            rl.close()
        }
        else {
            console.log("Please enter a valid command.")
            viewMenu()
        }
    }
)

rl.on("close", () => {
    console.log("Farewell, friend!")
})