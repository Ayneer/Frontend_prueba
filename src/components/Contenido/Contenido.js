import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Consumo from './Consumo/Consumo';
import Historial from './Historial/Historial';
import Limite from './Limite/Limite';
import Reporte from './Reporte/Reporte';
import Ajustes from './Ajustes/Ajustes';

import './contenido.css';

class Pagina extends React.Component {

    constructor() {
        super();
        this.state = {
            activarContenidos: false,
            usuario: null
        }
    }

    componentDidMount(){
        if(this.props.usuario!==null){
            this.setState({
                activarContenidos: true,
                usuario: this.props.usuario
            })
        } 
    }

    render() {
        console.log("soy contenido render");
        if (this.state.activarContenidos) {
            const socket = this.props.socket;
            return (
                <div id="contenido">
                    <Switch>
                        <Route path="/app" render={() => <Consumo usuario={this.state.usuario} consumo={this.props.consumo} socket={socket} />} />
                        <Route path="/consumo" render={() => <Consumo usuario={this.state.usuario} consumo={this.props.consumo} socket={socket} />} />
                        <Route path="/historial" render={() => <Historial usuario={this.state.usuario} />} />
                        <Route path="/limite" render={() => <Limite usuario={this.state.usuario} />} />
                        <Route path="/generarReporte" component={Reporte} />
                        <Route path="/ajustes" component={Ajustes} />

                    </Switch>
                </div>
            )
        } else {
            return(<div>Cargando...</div>)
        }
        

    }
}

export default Pagina;