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
        console.log("soy contenido render");
        const socket = this.props.socket;
        return (
            <div id="contenido">
                <Switch>
                    <Route path="/app" render={()=> <Consumo consumo={this.props.consumo} socket={socket} />}/>
                    <Route path="/consumo" render={()=> <Consumo consumo={this.props.consumo} socket={socket} />} />
                    <Route path="/historial" render={()=><Historial/>}/>
                    <Route path="/limite" component={Limite} />
                    <Route path="/generarReporte" component={Reporte} />
                    <Route path="/ajustes"component={Ajustes}/>
                    <Route path="/notificaciones"component={Notificacion}/>
                </Switch>
            </div>
        )
    }
}

export default Pagina;