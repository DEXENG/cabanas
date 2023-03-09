// https://bicalho.shinyapps.io/temperamento1/

const cabecalho = document.querySelector("#cabecalho");
const selecoes = document.querySelectorAll("select");
const soma = document.querySelector("#resultadoSoma");
const temperamento = document.querySelector("#resultadoTemperamento");
const botaoPrint = document.querySelector("#btnPrint");

const atualizaDados = function (e) {
  let somaHtml = "";
  let resHtml = "";

  // Somatoria dos resultados
  var Resposta = {
    Raposa: 0,
    Golfinho: 0,
    Castor: 0,
    Coruja: 0,
  };
  const animais = Object.keys(Resposta);

  let i = 0;
  selecoes.forEach((item) => {
    let animal = animais[i++];
    Resposta[animal] += parseInt(item.value);
    i = i % 4;
  });

  for (let animal in Resposta) {
    somaHtml += `${animal}: ${Resposta[animal]} </br>`;
  }

  // Temperamento
  let minimo = Math.min(...Object.values(Resposta));
  for (animal in Resposta) {
    if (minimo === Resposta[animal]) {
      resHtml += `${animal} </br>`;
    }
  }

  soma.innerHTML = somaHtml;
  temperamento.innerHTML = resHtml;
};

const imprimir = function () {
  botaoPrint.style.display = "none";
  cabecalho.style.display = "none";
  window.print();
  botaoPrint.style.display = "";
  cabecalho.style.display = "";
};

// Carrega no inicio
window.onload = atualizaDados(null);

// Event listeners
selecoes.forEach((item) => {
  item.addEventListener("change", atualizaDados, false);
});

botaoPrint.addEventListener("click", imprimir);
