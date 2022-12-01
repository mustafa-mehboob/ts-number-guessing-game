#! /usr/bin/env node

import inquirer from 'inquirer';
import Chalk from 'chalk'
import chalkAnimation from 'chalk-animation';

const welMsg1 = `██     ██ ███████ ██      ██       ██████  ██████ ███    ███ ███████`
const welMsg2 = `██     ██ ██      ██      ██       ██      ██  ██ ████   ███ ██`
const welMsg3 = `██  █  ██ █████   ██      ██       ██      ██  ██ ██ ████ ██ █████`
const welMsg4 = `██ ███ ██ ██      ██      ██       ██      ██  ██ ██  ██  ██ ██`
const welMsg5 = ` ███ ███  ███████ ███████ ███████  ██████  ██████ ██      ██ ███████`
console.log(`
${Chalk.whiteBright(welMsg1)}
${Chalk.blueBright(welMsg2)}
${Chalk.whiteBright(welMsg3)}
${Chalk.blueBright(welMsg4)}
${Chalk.whiteBright(welMsg5)}
`);

let usrName = await inquirer.prompt([
    {
        name: "userName",
        type: "input",
        message: Chalk.gray("Enter your name")
    }
]);
console.log(Chalk.greenBright(`        
  Wellcome ${usrName.userName}
Let Start Number Guessing Game`));

let usrInput = async () => {
    let usrInput = await inquirer.prompt([
        {
            name: "userInput",
            type: "number",
            message: Chalk.yellowBright("Guess number between 1 to 10")
        }
    ])
    return  usrInput.userInput
}


let score = 5;
let numFunc = async () => {

    let numbers: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let randomNumber = Math.ceil(Math.random() * numbers.length);

    for (let i = 4; i > 0; i--) {

        if (await usrInput() == randomNumber) {
            console.log(Chalk.bgGray(`Congratulation you win`));
            console.log(Chalk.bgGray(`You score ${score}`))
            break
        }

        else {

            if (i > 3) {
                score = score -1
                console.log(`${i - 1} turn are left`);
            }

            else if (i >= 2 || i > 1) {
                score = score -1
                console.log(`${i - 1} turn are left`);

                if (randomNumber <= 5) {
                    console.log(Chalk.yellowBright(`Hint less than or equal 5`));
                }
                else {
                    console.log(Chalk.yellowBright(`Hint grater than 5`));
                }
            }

            else {
                score = score -2
                console.log(Chalk.redBright(`Sorry you loose :(`));
                console.log(Chalk.redBright(`Your score is ${score}`));
                
            }
        }
    }
}


let again = async () => {
    do {
        await numFunc()
        score = score + 5;
        var repeat = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: Chalk.yellowBright("Do you want to play again? (y/n)")
        })
    } while (repeat.restart.toLowerCase() === "y" || repeat.restart.toLowerCase() === "yes" );
}

again()