import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import App from '../App';
import IniciarSesion from '../IniciarSesion/IniciarSesion';
import socketIOClient from "socket.io-client";
import Push from 'push.js';

let socket = null;//Conexion con socket servidor
const crearSocket = function () {
    socket = socketIOClient('http://192.168.1.54:3500');
    socket.on('connect', function () { });
    console.log("cree socket");
}

const crearSocket2 = function () {//borrar y probar
    socket = socketIOClient('http://192.168.1.54:3500');
    socket.on('connect', function () { });
    return socket;
}

class Sesion extends React.Component {

    constructor() {
        super();

        this.state = {
            ok: false,
            consumo: 0
        }
        this.activarSocket = this.activarSocket.bind(this);
        console.log('constructor');
    }

    //Metodo para verificar autenticacion, ejecutado antes de renderizar el componente
    activarSocket(socket) {//Verificacion con servidor para 
        console.log("Socket activado");
        socket.on('consumoReal', (consumo) => {
            console.log(consumo);
            this.setState({ consumo: consumo });
        });
        socket.on('limiteKwh', (consumo) => {
            console.log("Alerta: has superado el 50% de tu limite propuesto " + consumo);
            Push.create("Hello from Sabe.io!", {
                body: "This is a web notification!",
                icon: "/icon.png",
                timeout: 5000,
                onClick: function() {
                    console.log(this);
                }
            });
        });
    }

    async componentDidMount() {
        console.log('Soy componentDid');
        const respuesta = await fetch('http://192.168.1.54:3500/estoyAutenticado', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const res = await respuesta.json();
        if (!res.estado) {//Si la sesion esta inactiva 
            this.setState({ ok: true });
        } else {
            const socket = crearSocket2();

            socket.emit('actualizarSocket', res.usuario.correo);//Emitir correo por socket
            socket.on('Actualizado', (dato) => {//Si se acepta el correo puedo iniciar sesion
                if (dato) {
                    this.activarSocket(socket);
                    this.setState({ ok: true });
                }
            });
        }
        console.log('fin verfi');
    }

    render() {
        if (this.state.ok) {
            console.log('soy sesion');
            return (
                <div id="">
                    <Switch>
                        <Route path="/app" render={() => <App consumo={this.state.consumo} socket={socket} history={this.props.history} crearSocket={crearSocket} />} />
                        <Route path="/" render={() => <IniciarSesion activarSocket={this.activarSocket} socket={socket} history={this.props.history} crearSocket={crearSocket} crearSocket2={crearSocket2} />} />
                    </Switch>
                </div>
            )
        } else {
            return (
                <div> Cargando ... </div>
            )
        }
    }
}

export default withRouter(Sesion);