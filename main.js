#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//initialize user balance and pin code
let myBalance = 10000; // Dollar
let pincode = 1234;
//print welcome message
console.log(chalk.blue("\n \twelcome to SAM - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("Enter your pin"),
        type: "number"
    }
]);
//   12345 ===1234 - false
if (pinAnswer.pin === pincode) {
    console.log(chalk.green("\ncorrent pin code!!!\n"));
    //console.log('Corrent Account Balance is ${myBalance}')
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "please select option",
            type: "list",
            choices: ["withdraw", "check balance"]
        }
    ]);
    console.log(operationAns);
    if (operationAns.operation === "withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: " Select a withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"],
            }
        ]);
        if (withdrawAns.WithdrawMethod === "Fast Cash") {
            let fastcashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "select amount:",
                    choice: [1000, 2000, 3000, 5000, 10000, 15000, 20000]
                }
            ]);
            if (fastcashAns.fastcash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastcashAns.fastCash;
                console.log(chalk.green(`${fastcashAns.fastcash} withdraw successfully`));
                console.log(chalk.yellow(`your Remaining Balance is: ${myBalance}`));
            }
        }
        else if (`withdrawAns.WithdrawMethod === "EnterAmount"`) {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "enter your amount",
                    type: "number"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(' ${amountAns.amount} withdraw successfully'));
                console.log(chalk.yellow('your remaining balance is: ${myBalance}'));
            }
        }
    }
    else if (`operationAns.operation === "check balance"`) {
        console.log(chalk.yellow(`your balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Incorrect pin code, try again"));
}
