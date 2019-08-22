import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from '../App';
import IniciarSesion from '../IniciarSesion/IniciarSesion';

class Sesion extends React.Component {
    render() {
        return (
            <div id="">
                <Switch>
                    <Route path="/app" component={App} />
                    <Route path="/" component={IniciarSesion} />
                </Switch>
            </div>
        )
    }
}

export default Sesion;