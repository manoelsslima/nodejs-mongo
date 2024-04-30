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

function updateCustomer(id, newData) {
    // busco o customer no array pelo id - Number(string): converte string para number
    const customerIndex = customers.findIndex(customer => customer.id === Number(id));
    // se não encontrar (retorna -1)
    if (customerIndex === -1) return false;
    // pega o customer da posição customerIndex
    const customer = customers[customerIndex];
    // atualiza os dados
    if (newData.name) {
        customer.name = newData.name;
    }
    if (newData.address) {
        customer.address = newData.address;
    }
    if (newData.cpf) {
        customer.cpf = newData.cpf;
    }
    // substitui o customer antigo
    customers[customerIndex] = customer;
    // atualiza no arquivo
    fs.writeFileSync("db.json", JSON.stringify(customers));
    return true;
}

function deleteCustomer(id) {
    // busco o customer no array pelo id - Number(string): converte string para number
    const customerIndex = customers.findIndex(customer => customer.id === Number(id));
    // se não encontrar (retorna -1)
    if (customerIndex === -1) return false;
    // remove elementos do array. A partir do customerIndex, remove 1 elemento
    customers.splice(customerIndex, 1);
    // atualiza no arquivo
    fs.writeFileSync("db.json", JSON.stringify(customers));
    return true;
}

function getCustomers() {
    // se não informar o charset, será retornado um array de bytes
    const customerString = fs.readFileSync("db.json", "utf-8");

    // parse: converte uma string json em objeto
    customers = JSON.parse(customerString);

    return customers;
}

function getCustomer(id) {
    return customers.find(customer => customer.id === Number(id));
}

// para que possa ser importado em outros arquivos, devemos exportar os métodos
module.exports = {
    addCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomer
}