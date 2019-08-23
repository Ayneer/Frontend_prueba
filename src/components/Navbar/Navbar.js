import React from 'react';
import './navbar.css';

class Navbar extends React.Component {

    render() {
        if (this.props.soyYo === 'inicioSesion') {
            console.log(Math.random().toString(36).slice(-8));
            return (
                <nav id= "barra" className="navbar navbar-expand-lg navbar-light bg-light">
                    <div id="contenedorSesion" className="container-fluid">
                        <h5 id="titulo">EnergiaApp</h5>
                        <button id="ayuda" type="button" className="btn btn-info" onClick={this.props.cerrarSesion} >
                            <i className="fas fa-align-left"></i>
                            
                        </button>
                    </div>
                </nav>
            )
        } else {
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div id="contenedorPrincipal" className="container-fluid">
                        <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={this.props.metodo} >
                            <i className="fas fa-align-left"></i>
                            <span>Menú</span>
                        </button>
                        <button id="cerrar" type="button" className="btn btn-info" onClick={this.props.cerrarSesion} >
                            <i className="fas fa-align-left"></i>
                            <span>Cerrar Sesion</span>
                        </button>
                    </div>
                </nav>
            )
        }
    }
}

export default Navbar;