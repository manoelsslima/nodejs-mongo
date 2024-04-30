const db = require('./db');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

// a função deve ser async sempre que for usar await dentro dela
async function listCustomers() {
    console.clear();
    console.log("Clientes cadastrados: ");
    console.log("ID | Nome | CPF | Endereço");

    const customers = db.getCustomers();
    for (let i = 0; i < customers.length; i ++) {
        const customer = customers[i];
        console.log(`${customer.id} | ${customer.cpf} | ${customer.name} | ${customer.address}`);
    }
    console.log("");
    await rl.question("Pressione Enter para continuar...");
    printMenu();
}

function validateName(name) {
    if (!name) return false;
    if (name.trim().indexOf(" ") === -1) return false;
    return true;
}

function validateAddress(address) {
    if (!address) return false;
    if (address.trim().length < 10) return false;
    return true;
}

async function getAnswer(question, errorMessage, validationFunction) {
    let answer = "";
    do {
        answer = await rl.question(question + "\n");
        if (!validationFunction(answer)) {
            console.log(errorMessage);
        }
    } while (!validationFunction(answer));

    return answer;
}

async function startRegistration() {
    console.clear();

    let name = await getAnswer("Qual o nome do cliente?", "Nome inválido, tente novamente.", validateName);
    let address = await getAnswer("Qual o endereço do cliente? ", "Endereço inválido, tente novamente.", validateAddress);
    let cpf = await getAnswer("Qual o CPF do cliente? ", "CPF inválido, tente novamente.", () => { return true });

    const id = db.addCustomer(name, address, cpf);

    console.log(`Cliente cadastrado com sucesso! ID: ${id} `);
    await rl.question("Pressione Enter para continuar...");
    printMenu();
}

async function printMenu() {
    try {
        console.clear();
        console.log("Menu:");
        console.log("1 - Cadastrar Cliente");
        console.log("2 - Ver Clientes");
        console.log("3 - Encerrar");
        
        const answer = await rl.question("Qual opção você deseja? ");

        switch(answer) {
            case "1": startRegistration(); break;
            case "2": listCustomers(); break;
            case "3": {
                console.clear();
                process.exit(0);
            }
            default: console.log("Opção inválida. Tente novamente.");
        }
        await rl.question("Pressione Enter para continuar...");
        printMenu();
    } catch (err) {
        console.error("Resposta rejeitada", err);
    }
}

printMenu();