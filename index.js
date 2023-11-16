// Array para armazenar os dados dos funcionários
const funcionarios = [];

// Função para adicionar um novo funcionário
function adicionarFuncionario() {
    // Obter informações do funcionário a partir dos campos de entrada
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const salario = document.getElementById("salario").value;
    const cpf = document.getElementById("cpf").value;

    // Validar os campos de entrada
    if (!nome || !cargo || !salario || !cpf) {
        alert("Preencha todos os campos."); // Mostrar um alerta se algum campo estiver vazio
        return;
    }

    // Verificar se o CPF já está cadastrado
    if (funcionarios.find((f) => f.cpf === cpf)) {
        alert("CPF já cadastrado."); // Mostrar um alerta se o CPF já estiver cadastrado
        return;
    }

    // Adicionar o novo funcionário ao array
    funcionarios.push({ nome, cargo, salario, cpf });
    // Atualizar a lista de funcionários exibida
    atualizarListaFuncionarios();
    // Limpar os campos de entrada
    limparCampos();
}

// Função para excluir um funcionário
function excluirFuncionario(cpf) {
    // Encontrar o índice do funcionário com o CPF especificado
    const index = funcionarios.findIndex((f) => f.cpf === cpf);
    // Remover o funcionário do array se encontrado
    if (index !== -1) {
        funcionarios.splice(index, 1);
        // Atualizar a lista de funcionários exibida
        atualizarListaFuncionarios();
    }
}

// Função para atualizar a lista de funcionários exibida
function atualizarListaFuncionarios() {
    // Obter o elemento HTML para a lista de funcionários
    const listaFuncionarios = document.getElementById("lista-funcionarios");
    // Limpar a lista existente
    listaFuncionarios.innerHTML = "";

    // Iterar por cada funcionário e adicioná-lo à lista
    for (const funcionario of funcionarios) {
        const li = document.createElement("li");
        // Exibir informações do funcionário e adicionar um botão "Excluir"
        li.innerHTML = `
        <div class="formularioResposta">
            <li>Nome: ${funcionario.nome}</li>
            <li>Cargo: ${funcionario.cargo}</li>
            <li>Salário: ${funcionario.salario}</li>
            <li>CPF: ${funcionario.cpf}</li>
            <button onclick="excluirFuncionario('${funcionario.cpf}')">Excluir</button>
        </div>
        `;
        // Adicionar o item à lista HTML
        listaFuncionarios.appendChild(li);
    }
}

// Função para limpar os campos de entrada
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("cpf").value = "";
}

// Atualização inicial da lista de funcionários exibida
atualizarListaFuncionarios();


function downloadCSV() {
    // Verifica se há dados para salvar
    if (funcionarios.length === 0) {
        alert("Não há dados para salvar.");
        return;
    }

    // Cria o conteúdo CSV
    const csvContent = "Nome,Cargo,Salário,CPF\n" +
        funcionarios.map(f => `${f.nome},${f.cargo},${f.salario},${f.cpf}`).join("\n");

    // Cria um Blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    // Cria um link de download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "funcionarios.csv";

    // Adiciona o link ao documento
    document.body.appendChild(link);

    // Clica no link para iniciar o download
    link.click();

    // Remove o link do documento
    document.body.removeChild(link);
}

// Exemplo de uso: chame essa função quando quiser salvar os dados em CSV
// Por exemplo, adicione um botão no seu HTML e atribua esta função ao evento de clique.


