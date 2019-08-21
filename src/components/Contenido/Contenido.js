import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Consumo from './Consumo/Consumo';
import Historial from './Historial/Historial';
import './contenido.css';

class Pagina extends React.Component {
    render() {
        return (
            <div id="contenido">
                <Switch>
                    <Route path="/consumo" component={Consumo} />
                    <Route path="/historial" component={Historial} />
                </Switch>
            </div>
        )
    }
}

export default Pagina;