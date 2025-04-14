// Adicionar novas tarefas ao quadro Kanban
document.getElementById("formulario-tarefa").addEventListener("submit", function(evento) {
    evento.preventDefault();
    const tarefa = criarTarefa();
    document.getElementById("a-fazer").querySelector(".tarefas").appendChild(tarefa);
});

// Função para criar um novo card de tarefa
function criarTarefa() {
    const descricaoCurta = document.getElementById("descricao-curta").value;
    const prazo = document.getElementById("prazo").value;
    const autor = document.getElementById("autor").value;

    const tarefa = document.createElement("div");
    tarefa.className = "tarefa";
    tarefa.innerHTML = `
        <p>${descricaoCurta}</p>
        <p>Prazo: ${prazo}</p>
        <p>Autor: ${autor}</p>
        <div>
            <button class="mover-anterior">←</button>
            <button class="mover-proximo">→</button>
        </div>
    `;
    tarefa.addEventListener("click", mostrarDetalhes);
    return tarefa;
}

// Função para mostrar detalhes da tarefa em overlay
function mostrarDetalhes(evento) {
    if (evento.target.tagName === "BUTTON") return; // Ignorar cliques nos botões de mover

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = `
        <div class="detalhes-tarefa">
            <h3>Detalhes da Tarefa</h3>
            <p>Descrição: ${evento.target.querySelector("p:nth-child(1)").innerText}</p>
            <button onclick="fecharOverlay()">Fechar</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

// Função para fechar o overlay de detalhes
function fecharOverlay() {
    document.querySelector(".overlay").remove();
}

// Adicionar funcionalidade para mover tarefas entre as etapas
document.addEventListener("click", function(evento) {
    if (evento.target.classList.contains("mover-proximo")) {
        moverParaProximaEtapa(evento.target.closest(".tarefa"));
    } else if (evento.target.classList.contains("mover-anterior")) {
        moverParaEtapaAnterior(evento.target.closest(".tarefa"));
    }
});

// Função para mover tarefa para a próxima etapa
function moverParaProximaEtapa(tarefa) {
    const colunaAtual = tarefa.parentElement.parentElement.id;
    let proximaColuna;

    if (colunaAtual === "a-fazer") proximaColuna = "em-andamento";
    else if (colunaAtual === "em-andamento") proximaColuna = "concluido";

    if (proximaColuna) {
        document.getElementById(proximaColuna).querySelector(".tarefas").appendChild(tarefa);
        tarefa.style.transform = "translateX(20px)"; // Animação de deslizamento
        setTimeout(() => (tarefa.style.transform = ""), 300);
    }
}

// Função para mover tarefa para a etapa anterior
function moverParaEtapaAnterior(tarefa) {
    const colunaAtual = tarefa.parentElement.parentElement.id;
    let colunaAnterior;

    if (colunaAtual === "em-andamento") colunaAnterior = "a-fazer";
    else if (colunaAtual === "concluido") colunaAnterior = "em-andamento";

    if (colunaAnterior) {
        document.getElementById(colunaAnterior).querySelector(".tarefas").appendChild(tarefa);
        tarefa.style.transform = "translateX(-20px)"; // Animação de deslizamento
        setTimeout(() => (tarefa.style.transform = ""), 300);
    }
}

// Função para gerar relatório CSV
document.getElementById("gerar-relatorio").addEventListener("click", function() {
    const colunas = ["Descrição Curta", "Prazo", "Autor"];
    const linhas = [];
    document.querySelectorAll(".tarefa").forEach(tarefa => {
        const descricaoCurta = tarefa.querySelector("p:nth-child(1)").innerText;
        const prazo = tarefa.querySelector("p:nth-child(2)").innerText.split(": ")[1];
        const autor = tarefa.querySelector("p:nth-child(3)").innerText.split(": ")[1];
        linhas.push([descricaoCurta, prazo, autor].join(";"));
    });

    const csv = [colunas.join(";")].concat(linhas).join("\n");
    baixarArquivoCSV(csv, "relatorio_tarefas.csv");
});

// Função para baixar o arquivo CSV
function baixarArquivoCSV(conteudo, nomeArquivo) {
    const elemento = document.createElement("a");
    elemento.href = "data:text/csv;charset=utf-8," + encodeURIComponent(conteudo);
    elemento.download = nomeArquivo;
    elemento.style.display = "none";
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
}