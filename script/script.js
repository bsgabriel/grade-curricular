window.addEventListener("load", function () {
  carregarInfoCurso();
  carregarTabela();
});

function carregarInfoCurso() {
  document.getElementById("nomeCurso").textContent = jsonData.CURSO;
  document.getElementById("codCurso").textContent = jsonData.CODIGO_DO_CURSO;

  var lstInformacoes = document.getElementById("listaInformacoes");

  var duracao = document.createElement("li");
  duracao.appendChild(document.createTextNode("Duração: " + jsonData.DURACAO));
  lstInformacoes.appendChild(duracao);

  var cargaHoraria = document.createElement("li");
  cargaHoraria.appendChild(
    document.createTextNode("Carga Horária: " + jsonData.CARGA_HORARIA)
  );
  lstInformacoes.appendChild(cargaHoraria);
}

function carregarTabela() {
  table = document.getElementById("tabelaCursos");

  for (var j = 0; j < jsonData.DISCIPLINAS.length; j++) {
    var row = table.insertRow(j + 1);

    var idx = row.insertCell(0);
    var semestre = row.insertCell(1);
    var codDisciplina = row.insertCell(2);
    var nomeDisciplina = row.insertCell(3);
    var cargaHoraria = row.insertCell(4);

    idx.innerHTML = j;
    semestre.innerHTML = jsonData.DISCIPLINAS[j].SEMESTRE;
    codDisciplina.innerHTML = jsonData.DISCIPLINAS[j].CODIGO;
    nomeDisciplina.innerHTML = jsonData.DISCIPLINAS[j].DISCIPLINA;
    cargaHoraria.innerHTML = jsonData.DISCIPLINAS[j].HORAS + "h";

    idx.classList.add("numero");
    semestre.classList.add("numero");
    cargaHoraria.classList.add("numero");
  }
}
