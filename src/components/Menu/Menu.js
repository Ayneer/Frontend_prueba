import React from 'react';
import {Link} from 'react-router-dom';
import './menu.css';

class Menu extends React.Component {

    render() {
        return (
            <nav id="sidebar" className={this.props.estado}>
                <div className="sidebar-header">
                    <h3>Energía App</h3>
                </div>

                <ul className="list-unstyled components">
                    <p>¡Gestiona tu energía!</p>

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
    }
}

export default Menu;