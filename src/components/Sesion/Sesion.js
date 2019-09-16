import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import App from '../App';
import IniciarSesion from '../IniciarSesion/IniciarSesion';
import socketIOClient from "socket.io-client";
import Push from 'push.js';

let socket = null;//Conexion con socket servidor

const crearSocket2 = function () {//borrar y probar
    console.log("Cree socket");
    socket = socketIOClient('http://localhost:3500');
    socket.on('connect', function () { });
    return socket;
}

class Sesion extends React.Component {

    constructor() {
        super();

        this.state = {
            ok: false,
            consumo: 0,
            usuario: {},
            sesionActiva: false
        }
        this.usuario = this.usuario.bind(this);
        this.activarSocket = this.activarSocket.bind(this);
        this.sesionActiva = this.sesionActiva.bind(this);
    }

    activarSocket(socket) {
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
                onClick: function () {
                    console.log(this);
                }
            });
        });
        this.sesionActiva(true);
    }

    sesionActiva(estado){
        this.setState({sesionActiva: estado});
    }

    usuario(usuario) {
        this.setState({
            usuario: usuario
        })
    }

    async componentDidMount() {
        console.log('componentDidMount sesion');
        const respuesta = await fetch('http://localhost:3500/estoyAutenticado', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const res = await respuesta.json();
        if (!res.estado) {//Si la sesion esta inactiva 
            this.props.history.push('/');
            this.setState({ ok: true });
        } else {
            const socket = crearSocket2();
            socket.emit('actualizarSocket', res.usuario.correo);//Emitir correo por socket
            socket.on('Actualizado', (dato) => {//Si se acepta el correo puedo iniciar sesion
                if (dato) {
                    this.activarSocket(socket);
                    console.log("Sesion: Sesin activa, reenviando hacia app");
                    this.props.history.push('/App');
                    this.setState({ ok: true, usuario: res.usuario });
                }
            });

        }
    }

    render() {
        console.log('Render sesion - ok: ' + this.state.ok);
        if (this.state.ok) {
            return (
                <div id="">
                    <Switch>
                        {this.state.sesionActiva ? 
                            <Route path="/App" render={() => <App consumo={this.state.consumo} sesionActiva={this.sesionActiva} history={this.props.history} crearSocket2={crearSocket2} usuario={this.state.usuario} />} /> 
                            : 
                            <Route path="/" render={() => <IniciarSesion usuario={this.usuario} activarSocket={this.activarSocket} history={this.props.history} crearSocket2={crearSocket2} />} />
                        }
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