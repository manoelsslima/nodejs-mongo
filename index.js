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

function validateId(id) {
    return id > 0;
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

function validateNameUpdate(name) {
    if (!name) return true;
    if (name.trim().indexOf(" ") === -1) return false;
    return true;
}

function validateAddressUpdate(address) {
    if (!address) return true;
    if (address.trim().length < 10) return false;
    return true;
}

function validateConfirmation(choice) {
    choice = choice.toUpperCase()
    return choice === "S" || choice === "N";
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

async function startUpdate() {
    console.clear();

    const id = await getAnswer("Qual o ID do cliente?", "Id inválido, tente novamente.", validateId);
    const name = await getAnswer("Qual o novo nome do cliente? (Deixe em branco para manter o mesmo): ", "Nome inválido, tente novamente.", validateNameUpdate);
    const address = await getAnswer("Qual o novo endereço do cliente? (Deixe em branco para manter o mesmo): ", "Endereço inválido, tente novamente.", validateAddressUpdate);
    const cpf = await getAnswer("Qual o novo CPF do cliente? (Deixe em branco para manter o mesmo): ", "CPF inválido, tente novamente.", () => { return true });

    // id e o objeto
    const result = db.updateCustomer(id, { name, address, cpf });

    if (result) {
        console.log(`Cliente atualizado com sucesso!`);
    } else {
        console.log("Cliente não encontrado!");
    }

    await rl.question("Pressione Enter para continuar...");
    printMenu();
}

async function startDelete() {
    console.clear();

    const id = await getAnswer("Qual o ID do cliente?", "Id inválido, tente novamente.", validateId);

    const customer = db.getCustomer(id);
    const choice = await getAnswer(`Tem certeza que deseja excluir o cliente ${customer.name}? (S/N)`, "Opção inválida, tente novamente.", validateConfirmation);

    if (choice.toUpperCase() === "S") {
        const result = db.deleteCustomer(id);
        
        if (result) {
            console.log(`Cliente excluído com sucesso!`);
        } else {
            console.log("Cliente não encontrado!");
        }
    }

    await rl.question("Pressione Enter para continuar...");
    printMenu();
}

async function printMenu() {
    try {
        console.clear();
        console.log("Menu:");
        console.log("1 - Ver Cliente");
        console.log("2 - Cadastrar Clientes");
        console.log("3 - Editar Cliente");
        console.log("4 - Excluir Cliente");
        console.log("5 - Encerrar");
        
        const answer = await rl.question("Qual opção você deseja? ");

        switch(answer) {
            case "1": listCustomers(); break;
            case "2": startRegistration(); break;
            case "3": startUpdate(); break;
            case "4": startDelete(); break;
            case "5": {
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
db.getCustomers(); // para carregar o banco de dados para memória