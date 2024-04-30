const fs = require('fs');

let customers = [];

function addCustomer(name, address, cpf) {
    const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    // não precisa ser name: name; address: address; id: id. Se forem iguais
    // o javascript vai assumir
    customers.push({
        id,
        name,
        address,
        cpf
    });

    // stringfy: transforma um objeto em string json
    fs.writeFileSync("db.json", JSON.stringify(customers));

    return id;
}

function getCustomers() {
    // se não informar o charset, será retornado um array de bytes
    const customerString = fs.readFileSync("db.json", "utf-8");

    // parse: converte uma string json em objeto
    customers = JSON.parse(customerString);

    return customers;
}

// para que possa ser importado em outros arquivos, devemos exportar os métodos
module.exports = {
    addCustomer,
    getCustomers
}