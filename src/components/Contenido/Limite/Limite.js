import React from 'react';
import "./limite.css";

let usuario = {};

class Limite extends React.Component {

    capturarRespuestaServidor(respuestaS) {
        console.log(usuario);
        if (!respuestaS.estado) {
            this.props.history.push('/');// Se redirecciona a inicio de sesion
        } else {
            usuario = respuestaS.usuario;
            console.log(usuario);
        }
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
        }).then(res => this.capturarRespuestaServidor(res)).catch(error => console.error('Error:', error));
    }
    
    render() {
        return (
            <div id="contenido">
                <div className="row">
                    <div id="cuadrado" className="col-5">
                        <h6>Nuevo limite</h6>
                        <div id="form">
                            <select id="opciones">
                                <option>Unidad de consumo (kwh)</option>
                                <option>Pesos colombianos ($)</option>
                            </select>
                            <input className="form-control"id="campo" placeholder="Ingrese nuevo valor"></input>
                            <button id="ok" className="btn btn-primary">OK</button>
                        </div>
                    </div>
                    <div id="cuadrado1" className="col-5 offset-md-1">
                        <h6>Limite actual</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default Limite;