import React from 'react';
import './iniciarSesion.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import socketIOClient from "socket.io-client";

let usuario = {};

class IniciarSesion extends React.Component {

    respuesta = [];

    constructor() {
        super();

        this.state = {
            correo: "",
            contraseña: "",
            mensaje: ""
        }

        this.capturarInput = this.capturarInput.bind(this);
        this.iniciarSesion = this.iniciarSesion.bind(this);
    }
    capturarRespuestaServidor(respuestaS) {
        console.log(usuario);
        if (!respuestaS.estado) {
            this.props.history.push('/');// Se redirecciona a inicio de sesion
        } else {
            this.props.history.push('/app');// Se redirecciona a inicio de sesion
            usuario = respuestaS.usuario;
            console.log(usuario);
        }
    }

    componentWillMount() {
        console.log("cabeza de peo");
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

    capturarInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    capturarRespuestaServidor(respuestaS) {
        console.log(respuestaS);
        if (respuestaS.Estado) {
            const socket = socketIOClient('http://192.168.1.54:3500');
            socket.on('connect', function () { });
            let correo = document.getElementById('campo1');
            socket.emit('mi_correo', correo.value);
            socket.on('recibido', (dato) => {
                if (dato) {
                    this.props.history.push('/app');// Se redirecciona a la app 
                }
            });

        } else {

        }
    }

    iniciarSesion(e) {

        e.preventDefault();
        fetch('http://192.168.1.54:3500/iniciarSesion', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ correo: this.state.correo, contraseña: this.state.contraseña }),
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

            <div>

                {/* <Navbar soyYo='inicioSesion' /> */}
                <div className="row">
                    <div className="card iniciarSesion col-sm-12 col-md-6" >
                        <div id="cuadroForm" className="card-body">
                            <h5 className="card-title">Iniciar Sesion</h5>
                            <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: "none" }}>
                                <strong>{this.state.mensaje}f</strong>
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form>
                                <div className="form-group">
                                    <input id="campo1" type="email" className="campo form-control" ria-describedby="emailHelp" placeholder="Ingrese su correo" name="correo" value={this.state.correo} onChange={this.capturarInput} required />
                                </div>
                                <div className="form-group ">
                                    <input type="password" className="campo form-control" placeholder="Ingrese su contraseña" name="contraseña" value={this.state.contraseña} onChange={this.capturarInput} required />
                                </div>
                                <button id="btnIngresar" className="btn btn-primary" onClick={this.iniciarSesion}>Ingresar</button>
                            </form>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        )
    }
}

export default IniciarSesion;