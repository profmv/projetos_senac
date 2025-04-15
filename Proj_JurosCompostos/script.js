function gerarTabela() {

    let valorInicial = Number(document.getElementById("in-val-inic").value);
    let investMensal = Number(document.getElementById("in-inv-mensal").value);
    let taxaJuros = Number(document.getElementById("in-juros").value);
    let qtdMeses = Number(document.getElementById("in-qtd-meses").value);
    let anoInicial = Number(document.getElementById("in-ano-inic").value);
    let mesInicial = document.getElementById("sel-mes-inic").value;

    let valorAtual = valorInicial;
    let valorRendimento = 0;

    let textHTML = "";
    
    textHTML += "<table>";
    textHTML += "<thead>";
    textHTML += "<td>Seq.</td>";
    textHTML += "<td>Mês</td>";
    textHTML += "<td>Ano</td>";
    textHTML += "<td>Rendimento</td>";
    textHTML += "<td>Valor Final</td>";
    textHTML += "</thead>";

    for(let contagem = 1; contagem <= qtdMeses; contagem++) {

        valorRendimento = (investMensal + (valorAtual * (taxaJuros / 12 / 100)));
        valorAtual += valorRendimento;

        textHTML += "<tr>";

        textHTML += "<td>" + contagem + "</td>";
        textHTML += "<td>Mês</td>";
        textHTML += "<td>Ano</td>";
        textHTML += "<td>" + valorRendimento + "</td>";
        textHTML += "<td>" + valorAtual + "</td>";

        textHTML += "</tr>";

    }

    textHTML += "</table>";
    
    document.getElementById("resultado").innerHTML = textHTML;
}