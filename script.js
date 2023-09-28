const texto = document.querySelector("#texto")
const entrada = document.querySelector("#entrada")
const reiniciar = document.querySelector("#reiniciar")
const resultado = document.querySelector("#resultado")
const historico = document.querySelector("#historico")
const alternarTemaBtn = document.querySelector("#alternarTema")


const textos = [
    "Digite isso.",
    "Você pode digitar isso aqui.",
    "O sol brilha no céu azul. É um dia perfeito para um piquenique no parque.",
    "A complexidade da mente humana é um mistério fascinante.",
    "A neurociência busca compreender os intrincados processos cerebrais que governam nossas ações, emoções e pensamentos."
];

function novoTexto(){
    const index = Math.floor(Math.random()* textos.length);
    texto.textContent = textos[index];
}

function atualizarTeste(){
    iniciar();

    if(entrada.value === texto.textContent){
        verificar();
    }
}

function iniciar(){
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));
    if(!statusDoTeste){
        localStorage.setItem("tempoInicial", new Date().getTime());
        localStorage.setItem("testeEmAndamento", true);
    }
}

function verificar(){
    const tempoFinal = new Date().getTime();
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
    const tempoGasto = (tempoFinal - tempoInicial) / 1000;

    resultado.textContent = "Parabéns! Você levou " + tempoGasto + " segundos!";

    AdicionarAoHistorico(texto.textContent, tempoGasto);

    localStorage.setItem("testeEmAndamento", false);
    entrada.value = "";
    novoTexto();
}
function AdicionarAoHistorico(textoDigitado, tempoGasto){
    const itemHistorico = document.createElement("p");
    
    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto}`

    historico.appendChild(itemHistorico);

    
}

function reiniciarTeste(){
    entrada.value = "";
    resultado.textContent = "";
    novoTexto();
    localStorage.setItem("testeEmAndamento", false);
    historico.innerHTML = "";
}

function alternarTema(){
    const body = document.body;

    body.classList.toggle("claro");
    body.classList.toggle("escuro");

}

entrada.addEventListener("keyup",atualizarTeste);
reiniciar.addEventListener("click", reiniciarTeste);

alternarTemaBtn.addEventListener("click",alternarTema);

novoTexto();