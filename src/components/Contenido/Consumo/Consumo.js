import React from 'react';
import "./consumo.css";

let usuario = {};

class Consumo extends React.Component {

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
                    <div id="cuadro1" className="col-11">
                        <h6>Mi consumo actual</h6>
                        <h1 id="valor">11</h1>
                    </div>
                </div>
                <div className="row">
                    <div id="medio" className="col-12">

                    </div>
                </div>
                <div className="row">
                    <div id="cuadro3" className="col-5">
                        <h6>Costo</h6>
                    </div>
                    <div id="cuadro4" className="col-5 offset-md-1">
                        <h6>Limite</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default Consumo;