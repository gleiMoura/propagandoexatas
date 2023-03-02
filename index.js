const confirm_order = document.querySelector(".confirm_order");
const confirm_order_sim = document.querySelector(".confirm_order_sim");

const createTable = () => {
    const table = document.querySelector('.table');
    const diasDaSemana = [
        'Segunda',
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

    for (let k = 0; k < diasDaSemana.length; k++) {
        headerTable += `<th>${diasDaSemana[k]}</th>`
    }

    for (let j = 7; j < 23; j++) {
        let livre = 'sim'
        for (let i = 0; i < diasDaSemana.length; i++) {
            if (
                ((diasDaSemana[i] === 'Segunda' ||
                    diasDaSemana[i] === 'Terça' ||
                    diasDaSemana[i] === 'Quinta')
                    && verigicaIntervaloDeTrabalho(10, 19, j)) ||
                ((diasDaSemana[i] === 'Quarta' ||
                    diasDaSemana[i] === 'Sexta')
                    && verigicaIntervaloDeTrabalho(7, 21, j))
            ) {
                livre = 'nao'
            } else {
                livre = 'sim'
            }
            bodyTable += `
                    <td>
                        <div class="portfolio__button ${livre}" onclick="clickDay('${diasDaSemana[i]}','${livre}',${j})">
                            ${j}:00
                        </div>
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
}

const clickDay = (day, livre, hour) => {
    let message = `Eu gostaria de marcar uma aula para a(o) ${day} no horário de ${hour}h:00min`;
    if (livre === "nao") {
        message = 'Não temos aula disponível para esse horário'
        alert(message)
        return
    } else {
        confirm_order.classList.remove("confirm_order_none");
        confirm_order_sim.href = "https://wa.me/+5521990230279?text=" + encodeURIComponent(message);
    }
}

const fechaOrder = () => {
    confirm_order.classList.add("confirm_order_none")
}

const verigicaIntervaloDeTrabalho = (lowerLimit, upperLimit, number) => {
    if (number >= lowerLimit && number <= upperLimit) {
        return true
    } else {
        return false
    }
}

createTable();