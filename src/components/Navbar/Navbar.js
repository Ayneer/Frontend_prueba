import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { Switch, Route } from 'react-router-dom';

class Navbar extends React.Component {

    render() {
        if (this.props.soyYo === 'inicioSesion') {
            console.log(Math.random().toString(36).slice(-8));
            return (
                <div>
                    <nav id="barra" className="navbar navbar-expand-lg navbar-light bg-light">
                        <div id="contenedorSesion" className="container-fluid">
                            <h5 id="titulo">EnergiaApp</h5>
                            <Link to="/app/ayuda">
                                <button id="ayuda" type="button" className="btn btn-info" >
                                    <i className="fas fa-align-left"></i>
                                </button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )
        } else {
            return (

                <nav id="barraPrin" className="navbar navbar-expand-lg navbar-light bg-light">
                    <div id="contenedorPrincipal" className="container-fluid">
                        <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={this.props.metodo} >
                            <i className="fas fa-align-left"></i>
                        </button>
                        <Link to="/app/notificaciones">
                            <button id="msj" type="button" className="btn btn-info" >
                                <i className="fas fa-align-left"></i>

                            </button>
                        </Link>
                        
                            <button id="cerrar" type="button" className="btn btn-info" onClick={this.props.cerrarSesion} >
                                <i className="fas fa-align-left"></i>
                            </button>
                        
                    </div>
                </nav>

            )
        }
    }
}

export default Navbar;