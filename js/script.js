let alunos = [];
let indiceEdicao = null;

const form = document.getElementById("formAluno");
const tabela = document.querySelector("#tabelaAlunos tbody");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const nota = document.getElementById("nota").value;

  if (indiceEdicao === null) {
    alunos.push({ nome, idade, curso, nota });
  } else {
    alunos[indiceEdicao] = { nome, idade, curso, nota };
    indiceEdicao = null;
  }

  form.reset();
  renderizarTabela();
});

function renderizarTabela() {
  tabela.innerHTML = "";

  alunos.forEach((aluno, index) => {
    const linha = tabela.insertRow();
    linha.insertCell().textContent = aluno.nome;
    linha.insertCell().textContent = aluno.idade;
    linha.insertCell().textContent = aluno.curso;
    linha.insertCell().textContent = aluno.nota;

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

function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("nota").value = aluno.nota;
  indiceEdicao = index;
}

function excluirAluno(index) {
  alunos.splice(index, 1);
  renderizarTabela();
}
