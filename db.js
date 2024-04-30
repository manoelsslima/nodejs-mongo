const customers = [];

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
    return id;
}

function getCustomers() {
    return customers;
}

// para que possa ser importado em outros arquivos, devemos exportar os métodos
module.exports = {
    addCustomer,
    getCustomers
}