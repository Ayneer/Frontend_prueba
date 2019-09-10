import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import App from '../App';
import IniciarSesion from '../IniciarSesion/IniciarSesion';
import socketIOClient from "socket.io-client";

let socket = null;//Conexion con socket servidor
const crearSocket = function () {
    socket = socketIOClient('http://192.168.1.54:3500');
    socket.on('connect', function () { });
    console.log("cree socket");
}

class Sesion extends React.Component {

    constructor() {
        super();

        this.state = {
            ok: false
        }

        console.log('constructor');
    }

    //Metodo para verificar autenticacion, ejecutado antes de renderizar el componente
    async verificarSesion() {//Verificacion con servidor para 

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
        if (!res.estado) {//Si la sesion esta activa 
            crearSocket();
            this.setState({ ok: true });
        } else {
            crearSocket();
            socket.emit('actualizarSocket', res.usuario.correo);//Emitir correo por socket
            socket.on('Actualizado', (dato) => {//Si se acepta el correo puedo iniciar sesion
                if (dato) {
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
                        <Route path="/app" render={() => <App socket={socket} history={this.props.history} crearSocket={crearSocket} />} />
                        <Route path="/" render={() => <IniciarSesion socket={socket} history={this.props.history} crearSocket={crearSocket} />} />
                    </Switch>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default withRouter(Sesion);