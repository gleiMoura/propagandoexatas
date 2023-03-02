const createTable = () => {
    const table = document.querySelector('.table');
    const diasDaSemana = [
        'segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
        'Domingo'
    ];
    let headerTable = "";
    let bodyTable = "";
    let body = "";
    let livre = 'sim'

    for (let k = 0; k < diasDaSemana.length; k++) {
        headerTable += `<th>${diasDaSemana[k]}</th>`
    }

    for (let j = 7; j < 23; j++) {
        for (let i = 0; i < diasDaSemana.length; i++) {
            if(
                diasDaSemana[i] === 'segunda' ||
                diasDaSemana[i] === 'terça' ||
                diasDaSemana[i] === 'quinta'
            ) {
                livre = verigicaIntervaloDeTrabalho(j);
            }

            bodyTable += `
                    <td>
                        <div class="portfolio__button ${livre}" onclick="clickDay('${diasDaSemana[i]}','${livre}',${j})"></div>
                    </td>
            `
        }
        body += `<tr>
                    <td>${j}:00</td>
                    ${bodyTable}
                </tr>`
        bodyTable = '';
    };

    table.innerHTML = table.innerHTML + `
    <table>
        <tr>
            <th></th>
            ${headerTable}
        </tr>
        ${body}
    </table>`;

    console.log(table.innerHTML)
}

const clickDay = (day, livre, hour) => {
    let message = `Eu gostaria de marcar uma aula para a(o) ${day} no horário de ${hour}h:00min`;
    if (livre === "nao") {
        message = 'Não temos aula disponível para esse horário'
    }
    alert(message);
}

const verigicaIntervaloDeTrabalho = (intervalo) => {
    const number = intervalo;
    const lowerLimit = 10;
    const upperLimit = 19;

    if (number >= lowerLimit && number <= upperLimit) {
        return 'nao'
    } else {
        return 'sim'
    }
}

createTable();