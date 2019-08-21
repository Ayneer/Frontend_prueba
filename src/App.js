import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import Contenido from './components/Contenido/Contenido';

class App extends React.Component {
  constructor() {

    super();

    this.state = {
      estado: "inactive"
    }
    this.cambiarEstado = this.cambiarEstado.bind(this);
  }
  cambiarEstado() {
    if (this.state.estado === "inactive") {
      this.setState({
        estado: "active"
      })
    } else {
      this.setState({
        estado: "inactive"
      })
    }
  }


  render() {

    return (

      <BrowserRouter>
        <div className="App">

          <div id="app">
            <Menu estado={this.state.estado} />
            <div id="principal">
              <Navbar metodo={this.cambiarEstado} />
              <Contenido />
            </div>
          </div>

        </div>
      </BrowserRouter>
    );

  }

}

export default App;
