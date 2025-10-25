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

  isAprovado = () => this.notaFinal >= 7;

  toString = () =>
    `${this.nome} (${this.idade} anos) - ${this.curso} - Nota: ${this.notaFinal} - ${
      this.isAprovado() ? "Aprovado" : "Reprovado"
    }`;
}

// ============================
// CRUD com eventos e arrow functions
// ============================
let alunos = [];
let indiceEdicao = null;

const form = document.getElementById("formAluno");
const tabela = document.querySelector("#tabelaAlunos tbody");

// Evento de cadastro
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("nota").value;

  const aluno = new Aluno(nome, idade, curso, notaFinal);

  if (indiceEdicao === null) {
    alunos.push(aluno);
    alert(`✅ Aluno ${aluno.nome} cadastrado com sucesso!`);
    console.log(`🟢 Novo aluno cadastrado: ${aluno.toString()}`);
  } else {
    alunos[indiceEdicao] = aluno;
    alert(`✏️ Aluno ${aluno.nome} atualizado com sucesso!`);
    console.log(`🟡 Aluno atualizado: ${aluno.toString()}`);
    indiceEdicao = null;
  }

  form.reset();
  renderizarTabela();
});

// Renderiza a tabela de alunos
const renderizarTabela = () => {
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
    btnEditar.addEventListener("click", () => editarAluno(index));

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", () => excluirAluno(index));

    celAcoes.appendChild(btnEditar);
    celAcoes.appendChild(btnExcluir);
  });

  console.log("📋 Lista atualizada de alunos:", alunos.map(a => a.toString()));
};

// Editar aluno (arrow function)
const editarAluno = (index) => {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("nota").value = aluno.notaFinal;
  indiceEdicao = index;
  console.log(`✏️ Editando aluno: ${aluno.toString()}`);
};

// Excluir aluno (arrow function)
const excluirAluno = (index) => {
  if (confirm("Tem certeza que deseja excluir este aluno?")) {
    console.log(`🗑️ Aluno excluído: ${alunos[index].toString()}`);
    alunos.splice(index, 1);
    renderizarTabela();
  }
};
