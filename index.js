const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const customers = [];

// a função deve ser async sempre que for usar await dentro dela
async function listCustomers() {
    console.clear();
    console.log(customers);
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

async function startRegistration() {
    console.clear();
    let name = "";
    do {
        name = await rl.question("Qual o nome do cliente?\n");
        if (!validateName(name)) {
            console.log("Nome inválido, tente novamente.");
        }
    } while (!validateName(name));
    
    let address = "";
    do {
        address = await rl.question("Qual o endereço do cliente?\n");
        if (!validateAddress(address)) {
            console.log("Endereço inválido, tente novamente.");
        }
    } while (!validateName(address));
    const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    // não precisa ser name: name; address: address; id: id. Se forem iguais
    // o javascript vai assumir
    customers.push({
        id,
        name,
        address
    });
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