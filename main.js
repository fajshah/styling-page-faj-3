#!/usr/bin/env node
import inquirer from "inquirer";
//BANK ACCOUNT CLASS
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //DEBIT MONEY
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount}  successful!! Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient balance!!!");
        }
    }
    //CREDIT MONEY
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(` Deposite of $${amount} successful!!! Remaining balance : $${this.balance}`);
    }
    //CHECK BALANCE
    checkBalance() {
        console.log(`Current balance : $${this.balance}`);
    }
}
//creating custumers class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// CREATE BANK ACCOUNT
const accounts = [
    new BankAccount(1001, 5000),
    new BankAccount(1002, 3000),
    new BankAccount(1003, 2000)
];
// CREATE CUSTOMERS
const customers = [
    new Customer("Farzana", "Shah", "Female", 25, 3367814905, accounts[0]),
    new Customer("Shaheen", "Saqib", "Female", 28, 3166544820, accounts[1]),
    new Customer("Adnan", "Shah", "Male", 35, 3459555451, accounts[2])
];
//FUNCTION TO INTERACT WITH BANK ACCOUNT
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([{
                name: "accountNumber",
                type: "number",
                message: "Enter your account number : "
            }]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`WELCOME, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit: "
                        }]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        }]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("EXITING BANK PROGRAM");
                    console.log("\n Thank you for using our bank services. Have a great day");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again!!!");
        }
    } while (true);
}
service();
