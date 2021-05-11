class UI {
    constructor() {
        this.uiContainer = document.getElementById("content");
        this.city;
        this.defaultCity = "brasilia";
    }

    populateUI(data) {
        //de-structure vars

        //add them to inner HTML

        this.uiContainer.innerHTML = `
        <link rel="stylesheet" href="../../src/css/infos.css">
        <link rel="stylesheet" href="../../src/css/mobile.css">
        <div class="container">
                    <div class="matt-justify-container">
                        
                        <div class="row">
                            <div class="col">
                                <h4 class="nome-cidade">${data.name}</h4>
                                <span class="temperatura" id="temp">${data.main.temp}°C</span><br>
                                <!-- <span class="horario"><strong>12:34 hrs</strong> - Brasília</span> -->
                            </div>
                            <div class="col col-1" style="margin-top: -15px;">
                                <span class="matt-icon-sol-nuvem">
                                    <i class="fas fa-cloud-sun"></i>
                                </span>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col more-info">
                                <span><i class="icon-info fas fa-thermometer-half"></i></span>
                                <span>${data.main.temp} ST</span>
                            </div>
                            <div class="col more-info">
                                <span><i class="icon-info fas fa-wind"></i></span>
                                <span>${data.wind.speed} Km/h</span>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col more-info">
                                <span><i class="icon-info fas fa-tachometer-alt"></i></span>
                                <span>${data.main.pressure} hPa</span>
                            </div>
                            <div class="col more-info">
                                <span><i class="icon-info fas fa-tint"></i></span>
                                <span>${data.main.humidity}% UR</span>
                            </div>
                        </div>
                    </div>
                    <div class="container status-text">
                        <p class="card-text">Status: ${data.weather[0].description}</p>
                    </div>                    
                </div>      
        
        `;
    }

    clearUI() {
        uiContainer.innerHTML = "";
    }

    saveToLS(data) {
        localStorage.setItem("city", JSON.stringify(data));
    }

    getFromLS() {
        if (localStorage.getItem("city" == null)) {
            return this.defaultCity;
        } else {
            this.city = JSON.parse(localStorage.getItem("city"));
        }

        return this.city;
    }

    clearLS() {
        localStorage.clear();
    }
}
/* fim */
class Fetch {
    async getCurrent(input) {
        const myKey = "ea9a4f7269e6936fab343e2e183a4a43";

        //make request to url

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${input},pt_br&units=metric&appid=${myKey}&lang=pt_br`
        );

        const data = await response.json();

        if (response.status == 404) {
            console.log("CIDADE NÃO ENCONTRADA");
            alert("Ops! A cidade solicitada, não consta em nosso banco de dados :(");
        }

        console.log(data);

        return data;
    }
}
//inst classes//

const ft = new Fetch();
const ui = new UI();

//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
    const currentVal = search.value;

    ft.getCurrent(currentVal).then((data) => {
        //call a UI method//
        ui.populateUI(data);
        //call saveToLS
        ui.saveToLS(data);
    });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
    const dataSaved = ui.getFromLS();
    ui.populateUI(dataSaved);
});