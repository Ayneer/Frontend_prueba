import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import App from '../App';
import IniciarSesion from '../IniciarSesion/IniciarSesion';
import socketIOClient from "socket.io-client";

let socket = socketIOClient('http://192.168.1.54:3500');//Conexion con socket servidor


class Sesion extends React.Component {
    crearSocket(){
        socket = socketIOClient('http://192.168.1.54:3500');
    }
    componentDidMount(){
        console.log("cree socket");
        socket.on('connect', function () { });
    }
    render() {
        console.log('soy sesion');
        return (
            
            <div id="">
                <Switch>
                    <Route path="/app" render={() => <App socket={socket} history={this.props.history} crearSocket={this.crearSocket}/>} />
                    <Route path="/" render={() => <IniciarSesion socket={socket} history={this.props.history} />} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Sesion);