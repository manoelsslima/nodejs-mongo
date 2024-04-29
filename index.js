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

async function startRegistration() {
    console.clear();
    const name = await rl.question("Qual o nome do cliente?\n");
    const address = await rl.question("Qual o endereço do cliente?\n");
    const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    // não precisa ser name: name; address: address; id: id. Se forem iguais
    // o javascript vai assumir
    customers.push({
        id,
        name,
        address
    });
    console.log("Cliente cadastrado com sucesso!");
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