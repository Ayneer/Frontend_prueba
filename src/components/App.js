import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Menu from './Menu/Menu';
import Navbar from './Navbar/Navbar';
import Contenido from './Contenido/Contenido';
import Footer from './Footer/Footer';
import socketIOClient from "socket.io-client";

let usuario = {};

class App extends React.Component {

  constructor() {

    super();

    this.state = {
      estado: ""
    }

    this.cambiarEstado = this.cambiarEstado.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);

  }

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

  cambiarEstado() {
    if (this.state.estado === "") {
      this.setState({
        estado: "active"
      });
    } else {
      this.setState({
        estado: ""
      });
    }
  }

  redireccionar(res) {
    if (res.estado) {
      this.props.history.push('/');// Se redirecciona al login 

    }
  }

  cerrarSesion() {
    const socket = socketIOClient('http://192.168.1.54:3500');
    socket.on('connect', function () { });
    socket.emit('salir', usuario.correo);
    socket.on('recibido', (dato) => {
      fetch('http://192.168.1.54:3500/cerrarSesion',
        {
          credentials: 'include'
        })
        .then(function (response) {
          return response.json();
        })
        .then(res => this.redireccionar(res));
    });
  }

  render() {
    console.log("soy render");
    return (

      <BrowserRouter>
        <div className="App">

          <div id="app">

            <Menu estado={this.state.estado} />

            <div id="principal">

              <Navbar metodo={this.cambiarEstado} cerrarSesion={this.cerrarSesion} />

              <Contenido />

            </div>

          </div>


        </div>

      </BrowserRouter>
    );

  }

}

export default App;
