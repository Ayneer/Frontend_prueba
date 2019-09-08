import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

class Menu extends React.Component {

    render() {
        if (1 !== 1) {
            return (

                <nav id="sidebar" className={this.props.estado}>

                    {/* Titulo principal del menú */}
                    <div className="sidebar-header">
                        <h3>Energía App</h3>
                    </div>

                    <ul className="list-unstyled components">

                        {/* Subtitulo del menú */}
                        <p>¡Gestiona tu energía!</p>

                        {/* Items del menú */}
                        <li className="active">
                            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>

                            <ul className="collapse list-unstyled" id="homeSubmenu">
                                <li>
                                    <a href=" ">Home 1</a>
                                </li>
                                <li>
                                    <a href=" ">Home 2</a>
                                </li>
                                <li>
                                    <a href=" ">Home 3</a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to='/app/consumo'>Mi consumo</Link>
                        </li>
                        <li>
                            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                            <ul className="collapse list-unstyled" id="pageSubmenu">
                                <li>
                                    <a href=" ">Page 1</a>
                                </li>
                                <li>
                                    <a href=" ">Page 2</a>
                                </li>
                                <li>
                                    <a href=" ">Page 3</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to='/app/historial'>Mi historial</Link>
                        </li>
                        <li>
                            <Link to='/app/ajustes'>Ajustes</Link>
                        </li>
                    </ul>

                </nav>
            )
        } else {
            return (
                <nav id="sidebar" className={this.props.estado}>

                    <div className="sidebar-header">
                        <h3>Energía App</h3>
                    </div>
                    <ul className="list-unstyled components">

                        {/* Subtitulo del menú */}
                        <p>¡Gestiona tu energía!</p>

                        {/* Items del menú */}
                        <li className="impar">
                            <button id="consumo" className="item" >Mi consumo
                            <Link to='/app/consumo'> mi consumo</Link>
                            </button>
                        </li>
                        <li className="par">
                            <button id="historial" className="item">Mi historial
                            <Link to='/app/historial'></Link>
                            </button>
                        </li>
                        <li className="impar">
                            <button id="limite" className="item">Limite
                            <Link to='/app/limite'></Link>
                            </button>
                        </li>
                        <li className="par">
                            <button id="reporte" className="item">Generar reporte
                            <Link to='/app/generarReporte'></Link>
                            </button>
                        </li>
                        <li className="impar">
                            <button id="ajustes" className="item">Ajustes
                            <Link to='/app/ajustes'></Link>
                            </button>
                        </li>
                    </ul>
                    <div id="copyright">
                        <p>Copyright &copy; 2019.<br></br> Ayneer Gonzalez & Karen Benedetti. Todos los derechos reservados.</p>
                    </div>
                </nav>
            )
        }
    }
}

export default Menu;