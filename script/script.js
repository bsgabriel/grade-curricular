window.addEventListener('load', function () {
  loadHeader();

  let table = document.getElementById('tabelaCursos');
  loadTable(table);
  addRowHandlers(table);
});

function loadHeader() {
  document.getElementById('nomeCurso').textContent = jsonData.CURSO;
  document.getElementById('codCurso').textContent = jsonData.CODIGO_DO_CURSO;

  let duracao = document.getElementById("infoDuracao");
  const txtDuracao = 'Duração: ' + jsonData.DURACAO;
  const txtCargaHoraria = 'Carga Horária: ' + jsonData.CARGA_HORARIA;
  duracao.innerHTML = txtDuracao + '<br>' + txtCargaHoraria;
}

function loadTable(table) {
  for (let j = 0; j < jsonData.DISCIPLINAS.length; j++) {
    // let row = table.insertRow(j + 1);
    let row = table.getElementsByTagName('tbody')[0].insertRow(table.length);
    row.classList.add('content');
    row.setAttribute('data-toggle', 'modal');
    row.setAttribute('data-target', '#janelaModal');
    row.setAttribute('data-id', j);

    let idx = row.insertCell(0);
    let semestre = row.insertCell(1);
    let codDisciplina = row.insertCell(2);
    let nomeDisciplina = row.insertCell(3);
    let cargaHoraria = row.insertCell(4);

    idx.innerHTML = j;
    semestre.innerHTML = jsonData.DISCIPLINAS[j].SEMESTRE;
    codDisciplina.innerHTML = jsonData.DISCIPLINAS[j].CODIGO;
    nomeDisciplina.innerHTML = jsonData.DISCIPLINAS[j].DISCIPLINA;
    cargaHoraria.innerHTML = jsonData.DISCIPLINAS[j].HORAS + "h";

    idx.classList.add('numero');
    semestre.classList.add('numero');
    cargaHoraria.classList.add('numero');

    if (jsonData.DISCIPLINAS[j].SEMESTRE % 2 == 0) {
      row.classList.add('semestre-par');
    } else {
      row.classList.add('semestre-impar');
    }
  }
}

function addRowHandlers(table) {
  Array.from(table.rows).forEach(row => {
    row.onclick = function () {
      return function () {
        let id = this.cells[0].innerHTML;
        const codigo = document.getElementById('modalCodDisciplina');
        const txtCodigo = jsonData.DISCIPLINAS[id].CODIGO;
        codigo.innerHTML = txtCodigo;

        const nome = document.getElementById('modalNomeDisciplina');
        nome.innerHTML = jsonData.DISCIPLINAS[id].DISCIPLINA;

        const ementa = document.getElementById('modalEmenta');
        // checa se é materia optativa (começa com FGU)
        if (txtCodigo.startsWith('FGU')) {
          ementa.innerHTML = 'Disciplina optativa fica à escolha do aluno.';
        } else {
          ementa.innerHTML = jsonData.DISCIPLINAS[id].EMENTA;
        }

        const outros = document.getElementById('modalOutros');
        const txtSemestre = jsonData.DISCIPLINAS[id].SEMESTRE + 'º Semestre';
        const txtDuracao = 'Duração ' + jsonData.DISCIPLINAS[id].HORAS + ' horas';
        let txtModalidade = 'Modalidade ';

        const nat = jsonData.DISCIPLINAS[id].NAT;

        if (nat === 'FBP' || nat === 'FEP') {
          txtModalidade = txtModalidade.concat('presencial');
        } else {
          txtModalidade = txtModalidade.concat('EAD');
        }

        outros.innerHTML = txtSemestre + ' - ' + txtModalidade + ' - ' + txtDuracao;

      };
    }(row);
  });
}
