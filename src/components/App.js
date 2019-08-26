import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Menu from './Menu/Menu';
import Navbar from './Navbar/Navbar';
import Contenido from './Contenido/Contenido';
import Footer from './Footer/Footer';

class App extends React.Component {

  constructor() {

    super();

    this.state = {
      estado: ""
    }

    this.cambiarEstado = this.cambiarEstado.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
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
    // Se redirecciona al login 
    if (res.OK) {
      this.props.history.push('/');
      console.log("se cerro");
    }
  }

  cerrarSesion() {
    fetch('http://localhost:3500/salir')
      .then(function (response) {
        return response.json();
      })
      .then(res => this.redireccionar(res));
  }

  render() {

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
          <Footer />

        </div>

      </BrowserRouter>
    );

  }

}

export default App;
