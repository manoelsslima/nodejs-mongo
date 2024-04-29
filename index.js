const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

async function printMenu() {
    try {
        console.clear();
        console.log("Menu:");
        console.log("1 - Cadastrar Cliente");
        console.log("2 - Ver Clientes");
        console.log("3 - Encerrar");
        
        const answer = await rl.question("Qual opção você deseja?");
        if (answer === "3") {
            process.exit(0);
        } else {
            console.log("Sua escolha foi: " + answer);
            
            //setTimeout(printMenu, 3000);
            await rl.question("Pressione Enter para continuar...");
            printMenu();
        }
    } catch (err) {
        console.error("Resposta rejeitada", err);
    }
}

printMenu();