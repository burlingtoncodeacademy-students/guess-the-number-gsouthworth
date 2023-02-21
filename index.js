// IMPORTS READLINE AND ALLOWS US TO DO INPUT AND OUTPUT
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// ASK FUNCTION THAT TAKES IN TEXT AND RETURNS AND RESOLVES A PROMISE
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// run file in terminal with: node filename.js
//! DO NOT TOUCH CODE ABOVE THIS LINE

// Async start function being invoked

start();

// the function that starts the whole game
async function start() {
  //intro game text
  console.log(`\n--------------------------------`)
  console.log(`Welcome to Number Picker, that game where the computer always wins!`)
  console.log("Let's play a game where you make up a number and I will try to guess it.")

  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.

  // Example async await function to ask for the highest num
  async function pickHighNum() {
    //set lowest number
    let minNum = 1; 
    
    // Asking teh user for the highest number
    let pickMaxNum = await ask(`\nPick a number higher than ${minNum}, this will be the maximum number I can guess: `);

    // Grab the value of the user input
    let highNum = parseInt(pickMaxNum);

    // confirmation message to print
    console.log(`You set ${highNum} as the highest value`);
    return highNum; //couldn't get ym code to work kept saying NaN, still not positive why it only works with a return, can you let me know why?
  }

let highNum = await pickHighNum();
minNum = 1;
//first guess. Guessing the the number in the middle from high and low
let guess = Math.floor((highNum + 1) / 2);

let response = await ask(`Hmmmmmm, could your number be ${guess}?`);

//setting response to lower case to make sure no matter how the response is typed it works
while (response.toLowerCase() !== "yes") {
  if (response.toLowerCase() === "no") {
    let nextGuess = await ask(`Well this is embarrassing.... is your number higher (h) or lower (l) than ${guess}?`);
    if (nextGuess.toLowerCase() === "h") {
      minNum = guess + 1;
    } else if (nextGuess.toLowerCase() === "l") {
      highNum = guess - 1;
    } else {
      console.log(`I am sorry, but I didn't catch that. Please respond 'h' if higher, or 'l' if lower!`)
    }

    //guessing again, unless I won first try :)
    guess = Math.floor((highNum + minNum) / 2);
  } else {
    console.log(`Not sure I understand, please let me know if I am right by saying "yes" or if I am wrong please say "no"`)
  }

  response = await ask(`Let me guess, your number is... ${guess}`);
}

console.log(`I told you I will always win this game! :)`)

process.exit();
}
