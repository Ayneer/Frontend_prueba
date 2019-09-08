import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Consumo from './Consumo/Consumo';
import Historial from './Historial/Historial';
import Limite from './Limite/Limite';
import Reporte from './Reporte/Reporte';
import Ajustes from './Ajustes/Ajustes';
import Notificacion from './Notificacion/Notificacion';
import './contenido.css';

class Pagina extends React.Component {
    render() {
        return (
            <div id="contenido">
                <Switch>
                    <Route path="/app/consumo" component={Consumo} />
                    <Route path="/app/historial" component={Historial} />
                    <Route path="/app/limite" component={Limite} />
                    <Route path="/app/generarReporte" component={Reporte} />
                    <Route path="/app/ajustes"component={Ajustes}/>
                    <Route path="/app/notificaciones"component={Notificacion}/>
                    
                </Switch>
            </div>
        )
    }
}

export default Pagina;