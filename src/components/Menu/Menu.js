import React from 'react';
import {Link} from 'react-router-dom';
import './menu.css';

class Menu extends React.Component {

    render() {
        return (
            <nav id="sidebar" className={this.props.estado}>
                <div className="sidebar-header">
                    <h3>Bootstrap Sidebar</h3>
                </div>

                <ul className="list-unstyled components">
                    <p>Dummy Heading</p>

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
                        <Link to='/consumo'>Consumo</Link>
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
                        <Link to='/historial'>Historial</Link>
                    </li>
                    <li>
                        <a href=" ">Contacts</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Menu;