const confirm_order = document.querySelector(".confirm_order");
const confirm_order_sim = document.querySelector(".confirm_order_sim");
const portugues = document.querySelectorAll(".portugues");
const ingles = document.querySelectorAll(".ingles");
const botaoLingua = document.querySelector(".botaoLingua");

localStorage.setItem("load", "sim");

const createTable = (lingua) => {
    const table = document.querySelector('.table');
    let diasDaSemana = [];
    if (lingua === "portugues") {
        diasDaSemana = [
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
            'Domingo'
        ];
    } else {
        diasDaSemana = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
    }

    let headerTable = "";
    let bodyTable = "";
    let body = "";

    for (let k = 0; k < diasDaSemana.length; k++) {
        headerTable += `<th>${diasDaSemana[k]}</th>`
    }

    for (let j = 7; j < 23; j++) {
        let livre = 'sim'
        for (let i = 0; i < diasDaSemana.length; i++) {
            if (lingua === "portugues") {
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
            } else {
                if (
                    ((diasDaSemana[i] === 'Monday' ||
                        diasDaSemana[i] === 'Tuesday' ||
                        diasDaSemana[i] === 'Thursday')
                        && verigicaIntervaloDeTrabalho(10, 19, j))
                    ||
                    ((diasDaSemana[i] === 'Wednesday' ||
                        diasDaSemana[i] === 'Friday')
                        && verigicaIntervaloDeTrabalho(7, 21, j))
                ) {
                    livre = 'nao';
                } else {
                    livre = 'sim';
                }
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
    <table class="childTable">
        <tr>
            <th></th>
            ${headerTable}
        </tr>
        ${body}
    </table>`;
}

const clickDay = (day, livre, hour) => {
    let message = "";
    if (ingles[0].classList.contains("none")) {
        message = `Eu gostaria de marcar uma aula para a(o) ${day} no horário de ${hour}h:00min`;
    } else {
        message = `I would like to book a class for ${day} at ${hour}h:00min`;
    }

    if (livre === "nao") {
        if (ingles[0].classList.contains("none")) {
            message = 'Não temos aula disponível para esse horário'
        } else {
            message = "we don't have classes for that time";
            alert(message);
            return;
        }
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

const changeLanguage = () => {
    if (botaoLingua.classList.contains("ingles")) {
        for (let i = 0; i < portugues.length; i++) {
            ingles[i].classList.toggle("none");
            portugues[i].classList.toggle("none")
        }
    } else {
        for (let j = 0; j < ingles.length; j++) {
            portugues[j].classList.toggle("none");
            ingles[j].classList.toggle("none")
        }
    }
    botaoLingua.classList.toggle("ingles");

    const table = document.querySelector(".childTable");

    if (table.parentNode) {
        table.parentNode.removeChild(table)
    }

    if (ingles[0].classList.contains("none")) {
        createTable("portugues")
    } else {
        createTable()
    }
}

const local = localStorage.getItem("load");

if (local) {
    createTable("portugues");
    localStorage.removeItem("load")
}

