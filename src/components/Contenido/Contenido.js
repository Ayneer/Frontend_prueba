import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Consumo from './Consumo/Consumo';
import Historial from './Historial/Historial';
import Ajustes from './Ajustes/Ajustes';
import './contenido.css';

class Pagina extends React.Component {
    render() {
        return (
            <div id="contenido">
                <Switch>
                    <Route path="/app/consumo" component={Consumo} />
                    <Route path="/app/historial" component={Historial} />
                    <Route path="/app/ajustes"component={Ajustes}/>
                </Switch>
            </div>
        )
    }
}

export default Pagina;