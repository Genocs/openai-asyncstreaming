// fooModule.js

// Function to greet a user
function greet(name) {
  return `Hello, ${name}!`;
}

// Function to add two numbers
function add(a, b) {
  return a + b;
}

// Define an asynchronous function that waits for a timer
async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}



// Exporting functions to make them accessible from other files
module.exports = {
  greet,
  add,
  wait
};

// exports.greet = greet;
// exports.add = add;

