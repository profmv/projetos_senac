// Função para adicionar tarefas
document.getElementById("formulario-tarefa").addEventListener("submit", function(evento) {
    evento.preventDefault();
    const tarefa = criarTarefa();
    document.getElementById("a-fazer").querySelector(".tarefas").appendChild(tarefa);
});

// Função para criar elementos de tarefa
function criarTarefa() {
    const descricaoCurta = document.getElementById("descricao-curta").value;
    const prazo = document.getElementById("prazo").value;
    const autor = document.getElementById("autor").value;

    const tarefa = document.createElement("div");
    tarefa.className = "tarefa";
    tarefa.innerHTML = `<p>${descricaoCurta}</p><p>${prazo}</p><p>${autor}</p>`;
    tarefa.addEventListener("click", mostrarDetalhes);
    return tarefa;
}

// Função para mostrar detalhes em overlay
function mostrarDetalhes() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = `
        <div>
            <h3>Detalhes da Tarefa</h3>
            <button onclick="fecharOverlay()">Fechar</button>
        </div>`;
    document.body.appendChild(overlay);
}

// Função para fechar overlay
function fecharOverlay() {
    document.querySelector(".overlay").remove();
}

// Função para gerar relatório CSV
document.getElementById("gerar-relatorio").addEventListener("click", function() {
    const colunas = ["Descrição", "Prazo", "Autor"];
    const csv = [colunas.join(",")];
    // Adicione a lógica para capturar os dados das tarefas
    alert("Relatório CSV gerado!");
});