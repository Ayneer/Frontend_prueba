import React from 'react';
import Chart from 'chart.js';
import './historial.css';
let usuario = {};

class Historial extends React.Component {
    graficar(data) {
        var ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Madrugada',
                    data: data.consumoMadrugada,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: 'Manana',
                    data: data.consumoManana,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1

                },{
                    label: 'Tarde',
                    data: data.consumoTarde,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1

                },{
                    label: 'Noche',
                    data: data.consumoNoche,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1

                }]
            },
            options: {
                scales: {
                    yAxes: [{

                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{

                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    componentWillMount() {
        fetch('http://192.168.1.54:3500/estoyAutenticado', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(res => {
            if (!res.estado) {
                this.props.history.push('/');// Se redirecciona a inicio de sesion
            } else {
                usuario = res.usuario;
                this.consultarHistorial(usuario.correo);
            }
        }).catch(error => console.error('Error:', error));
    }

    consultarHistorial(correo) {
        console.log(usuario.correo);
        fetch('http://192.168.1.54:3500/historial/' + correo, {//Solicitar historial
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        }).then(function (response) {//Analiza respuesta
            return response.json();
        }).then(res => {
            console.log(res);
            this.graficar(this.obtenerHistoriales(res.historial, "9"));
        }).catch(error => console.error('Error:', error));

    }

    obtenerHistoriales(historial, mes) {

        //Objeto a devolver
        let data = {
            consumoMadrugada: [],
            consumoManana: [],
            consumoTarde: [],
            consumoNoche: [],
            labels: []
        }

        let arrayConsumoManana = [];
        let arrayConsumoMadrugada = [];
        let arrayconsumoTarde = [];
        let arrayconsumoNoche = [];

        let labels = [];

        //Llenar arrays
        for (var i = 0; i < 31; i++) {
            arrayConsumoManana.push(0);
            arrayConsumoMadrugada.push(0);
            arrayconsumoTarde.push(0);
            arrayconsumoNoche.push(0);
        }
        for (var i = 1; i <= 31; i++) {
            labels.push(i);
        }

        data.labels = labels;

        for (var i = 0; i < historial.length; i++) {
            var fecha = historial[i].fecha;
            const arrayFecha = fecha.split("/");
            let diaConsumido = +arrayFecha[1];
            console.log(mes);
            if (arrayFecha[0] === mes) {

                console.log(mes);

                if (historial[i].consumoTarde != undefined) {
                    console.log("tiene consumoTarde");
                    for (var h = 0; h < labels.length; h++) {
                        if (labels[h] === diaConsumido) {
                            arrayconsumoTarde[h] = historial[i].consumoTarde;
                        }
                    }
                    data.consumoTarde = arrayconsumoTarde;
                } else {
                    console.log("No tiene consumoTarde");
                    data.consumoTarde = arrayconsumoTarde;
                }

                if (historial[i].consumoMañana != undefined) {
                    console.log("tiene consumoMañana");
                    for (var h = 0; h < labels.length; h++) {
                        if (labels[h] === diaConsumido) {
                            arrayConsumoManana[h] = historial[i].consumoMañana;
                        }
                    }
                    data.consumoManana = arrayConsumoManana;
                } else {
                    console.log("No tiene consumoMañana");
                    data.consumoManana = arrayConsumoManana;
                }

                if (historial[i].consumoMadrugada != undefined) {
                    console.log("tiene consumoMadrugada");
                    for (var h = 0; h < labels.length; h++) {
                        if (labels[h] === diaConsumido) {
                            arrayConsumoMadrugada[h] = historial[i].consumoMadrugada;
                        }
                    }
                    data.consumoMadrugada = arrayConsumoMadrugada;
                } else {
                    console.log("No tiene consumoMadrugada");
                    data.consumoMadrugada = arrayConsumoMadrugada;
                }

                if (historial[i].consumoNoche != undefined) {
                    console.log("tiene consumoNoche");
                    for (var h = 0; h < labels.length; h++) {
                        if (labels[h] === diaConsumido) {
                            arrayconsumoNoche[h] = historial[i].consumoNoche;
                        }
                    }
                    data.consumoNoche = arrayconsumoNoche;
                } else {
                    console.log("No tiene consumoNoche");
                    data.consumoNoche = arrayconsumoNoche;
                }

            }
        }
        console.log(data);
        return data;
    }

    render() {
        return (
            <div className=" grafica">
                <canvas id="myChart"></canvas>
            </div>
        )
    }
}

export default Historial;
