// ============================
// Classe Aluno
// ============================
class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = parseFloat(notaFinal);
  }

  // Retorna true se o aluno foi aprovado
  isAprovado() {
    return this.notaFinal >= 7;
  }

  // Retorna os dados formatados
  toString() {
    return `${this.nome} (${this.idade} anos) - ${this.curso} - Nota: ${this.notaFinal} - ${
      this.isAprovado() ? "Aprovado" : "Reprovado"
    }`;
  }
}

// ============================
// CRUD
// ============================
let alunos = [];
let indiceEdicao = null;

const form = document.getElementById("formAluno");
const tabela = document.querySelector("#tabelaAlunos tbody");

// Evento de submit do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("nota").value;

  const aluno = new Aluno(nome, idade, curso, notaFinal);

  if (indiceEdicao === null) {
    alunos.push(aluno);
    alert(`Aluno ${aluno.nome} cadastrado com sucesso!`);
  } else {
    alunos[indiceEdicao] = aluno;
    alert(`Aluno ${aluno.nome} atualizado com sucesso!`);
    indiceEdicao = null;
  }

  form.reset();
  renderizarTabela();
});

// ============================
// Renderização da tabela
// ============================
function renderizarTabela() {
  tabela.innerHTML = "";

  alunos.forEach((aluno, index) => {
    const linha = tabela.insertRow();

    linha.insertCell().textContent = aluno.nome;
    linha.insertCell().textContent = aluno.idade;
    linha.insertCell().textContent = aluno.curso;
    linha.insertCell().textContent = aluno.notaFinal.toFixed(1);
    linha.insertCell().textContent = aluno.isAprovado() ? "✅" : "❌";

    const celAcoes = linha.insertCell();

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarAluno(index);

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => excluirAluno(index);

    celAcoes.appendChild(btnEditar);
    celAcoes.appendChild(btnExcluir);
  });
}

// ============================
// Funções CRUD
// ============================
function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("nota").value = aluno.notaFinal;
  indiceEdicao = index;
}

function excluirAluno(index) {
  if (confirm("Tem certeza que deseja excluir este aluno?")) {
    alert(`Aluno ${alunos[index].nome} excluído.`);
    alunos.splice(index, 1);
    renderizarTabela();
  }
}
