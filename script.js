// ============================
// Classe Aluno
// ============================
class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = parseInt(idade);
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
// CRUD + Relatórios
// ============================
let alunos = [];
let indiceEdicao = null;

const form = document.getElementById("formAluno");
const tabela = document.querySelector("#tabelaAlunos tbody");
const saidaRelatorio = document.getElementById("saidaRelatorio");

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
  } else {
    alunos[indiceEdicao] = aluno;
    alert(`✏️ Aluno ${aluno.nome} atualizado com sucesso!`);
    indiceEdicao = null;
  }

  form.reset();
  renderizarTabela();
});

// Renderização da tabela
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
};

// Editar aluno
const editarAluno = (index) => {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("nota").value = aluno.notaFinal;
  indiceEdicao = index;
};

// Excluir aluno
const excluirAluno = (index) => {
  if (confirm("Tem certeza que deseja excluir este aluno?")) {
    alunos.splice(index, 1);
    renderizarTabela();
  }
};

// ============================
// Relatórios
// ============================

// 1Alunos Aprovados
document.getElementById("btnAprovados").addEventListener("click", () => {
  const aprovados = alunos.filter(a => a.isAprovado());
  saidaRelatorio.innerHTML = aprovados.length
    ? "✅ Aprovados:<br>" + aprovados.map(a => a.nome).join(", ")
    : "Nenhum aluno aprovado.";
  console.log("📊 Alunos aprovados:", aprovados.map(a => a.toString()));
});

// Média das Notas
document.getElementById("btnMediaNotas").addEventListener("click", () => {
  if (alunos.length === 0) return (saidaRelatorio.textContent = "Nenhum aluno cadastrado.");
  const media = alunos.map(a => a.notaFinal).reduce((a, b) => a + b, 0) / alunos.length;
  saidaRelatorio.textContent = `📈 Média das notas: ${media.toFixed(2)}`;
  console.log("📈 Média das notas:", media);
});

// Média das Idades
document.getElementById("btnMediaIdades").addEventListener("click", () => {
  if (alunos.length === 0) return (saidaRelatorio.textContent = "Nenhum aluno cadastrado.");
  const media = alunos.map(a => a.idade).reduce((a, b) => a + b, 0) / alunos.length;
  saidaRelatorio.textContent = `👨‍🏫 Média das idades: ${media.toFixed(1)}`;
  console.log("👨‍🏫 Média das idades:", media);
});

// Ordenar Nomes
document.getElementById("btnOrdenarNomes").addEventListener("click", () => {
  const nomes = alunos.map(a => a.nome).sort((a, b) => a.localeCompare(b));
  saidaRelatorio.innerHTML = "🔤 Nomes em ordem alfabética:<br>" + nomes.join(", ");
  console.log("🔤 Ordem alfabética:", nomes);
});

// Quantidade de alunos por curso
document.getElementById("btnPorCurso").addEventListener("click", () => {
  if (alunos.length === 0) return (saidaRelatorio.textContent = "Nenhum aluno cadastrado.");
  const contagem = alunos.reduce((acc, aluno) => {
    acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
    return acc;
  }, {});
  saidaRelatorio.innerHTML = "📚 Quantidade por curso:<br>" +
    Object.entries(contagem)
      .map(([curso, qtd]) => `${curso}: ${qtd}`)
      .join("<br>");
  console.log("📚 Quantidade de alunos por curso:", contagem);
});
