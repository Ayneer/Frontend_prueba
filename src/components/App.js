import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Menu from './Menu/Menu';
import Navbar from './Navbar/Navbar';
import Contenido from './Contenido/Contenido';
import Footer from './Footer/Footer';

let usuario = {};

class App extends React.Component {

  constructor() {

    super();

    this.state = {
      estado: "",
      mostrar: false
    }

    this.cambiarEstado = this.cambiarEstado.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);

  }
  //Metodo para verificar si esta autenticado
  componentDidMount() {//Se realiza verificacion con servidor
    fetch('http://192.168.1.54:3500/estoyAutenticado', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(res => {//Analiza respuesta de servidor
      if (!res.estado) {//Si el usuario no esta autenticado
        this.props.history.push('/');// Se redirecciona a inicio de sesion
      } else {//Si el usuario esta autenticado
        usuario = res.usuario;//Capturamos los datos del usuario
        this.setState({ mostrar: true });//Habilitamos la vista de /app
        console.log(usuario);
      }

    }).catch(error => console.error('Error:', error));
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
  //Metodo para cerrar sesion de usuario 
  cerrarSesion() {
    const socket = this.props.socket;//Conexion con socket servidor
    socket.emit('salir', usuario.correo);//Emitir correo para solicitar salir de sesion
    socket.on('recibido', (dato) => {//El correo el usuario es recibido
      fetch('http://192.168.1.54:3500/cerrarSesion', {//Solicitud para cerrar sesion
        credentials: 'include'
      })
        .then(function (response) {//Analiza respuesta de servidor
          return response.json();
        })
        .then(res => {
          if (res.estado) {
            console.log(res);
            this.props.crearSocket();
            this.props.history.push('/');// Se redirecciona a iniciar sesion
          }
        });
    });
  }

  render() {

    if (this.state.mostrar) {
      console.log(this.props.socket);
      return (

        <BrowserRouter>
          <div className="App">

            <div id="app">

              <Menu estado={this.state.estado} />

              <div id="principal">

                <Navbar metodo={this.cambiarEstado} cerrarSesion={this.cerrarSesion} />

                <Contenido socket={this.props.socket}/>

              </div>

            </div>
          </div>

        </BrowserRouter>
      );
    } else {
      return (

        <div></div>
      );

    }

  }

}

export default App;
