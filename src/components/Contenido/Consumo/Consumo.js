import React from 'react';
import "./consumo.css";

let usuario;
let consumo = 0;
class Consumo extends React.Component {

    constructor() {

        super();
        this.state = {
            consumo: 0,
            mostrarConsumo: false
        };

    }

    //Metodo para realizar consulta de consumo
    consultarConsumo(correo) {
        console.log(usuario.correo);
        fetch('http://localhost:3500/consumo/' + correo, {//Solicitr consumo real
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        }).then(function (response) {//Analiza respuesta
            return response.json();
        }).then(res => {
            if (!res.estado) {
                //Mensaje de que no existe consumo
            } else {
                consumo = res.consumoMes.consumoMes;
                return consumo;
                //this.setState({ consumo: res.consumoMes.consumoMes })
                //Actualizar estado del consumo real 
            }
        }).catch(error => console.error('Error:', error));

    }

    componentDidMount() {
        console.log("componentDidMount Consumo "+this.props.usuario.correo);
        if (this.props.usuario.correo) {
            if (this.props.consumo === 0) {
                fetch('http://localhost:3500/consumo/' + this.props.usuario.correo, {//Solicitr consumo real
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                }).then(function (response) {//Analiza respuesta
                    return response.json();
                }).then(res => {
                    if (res.estado) {
                        console.log("Encontre Consumo");
                        this.setState({
                            mostrarConsumo: true,
                            consumo: res.consumoMes.consumoMes
                        });
                    }else{
                        console.log("Error al encontrar consumo");
                    }
                }).catch(error => console.error('Error:', error));
            }else{
                this.setState({
                    mostrarConsumo: true,
                    consumo: this.props.consumo
                });
            }
        }

        // fetch('http://192.168.1.54:3500/estoyAutenticado', {//Consulta al sevidor para verificar la atenticidad
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json; charset=UTF-8',
        //         'Accept': 'application/json'
        //     }
        // }).then(function (response) {//Analiza respuesta de servidor
        //     return response.json();
        // }).then(res => {
        //     if (!res.estado) {//Si no esta autenticado

        //     } else {//Si esta autenticado
        //         usuario = res.usuario;//Captura datos de usuario
        //         fetch('http://192.168.1.54:3500/consumo/' + usuario.correo, {//Solicitr consumo real
        //             credentials: 'include',
        //             headers: {
        //                 'Content-Type': 'application/json; charset=UTF-8',
        //                 'Accept': 'application/json'
        //             }
        //         }).then(function (response) {//Analiza respuesta
        //             return response.json();
        //         }).then(res => {
        //             if (res.estado) {
        //                 this.setState({
        //                     consumo: res.consumoMes.consumoMes
        //                 });
        //             }
        //         }).catch(error => console.error('Error:', error));
        //     }
        // }).catch(error => console.error('Error:', error));

    }

    render() {

        consumo = this.props.consumo;
        let mostrar = true;
        if (this.state.consumo === 0) {
            mostrar = false;
        }
        if (this.state.consumo <= consumo) {
            mostrar = false;
        }

        if (this.state.mostrarConsumo) {
            console.log("Render Consumo: "+this.props.usuario);
            return (
                <div id="contenido">
                    <div className="row">
                        <div id="cuadro1" className="col-11">
                            <h6>Mi consumo actual</h6>
                            {mostrar ?
                                <h1 id="valor">{this.state.consumo}</h1> :
                                <h1 id="valor">{consumo}</h1>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div id="medio" className="col-12">

                        </div>
                    </div>
                    <div className="row">
                        <div id="cuadro3" className="col-5">
                            <h6>Costo</h6>
                        </div>
                        <div id="cuadro4" className="col-5 offset-md-1">
                            <h6>Limite</h6>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div>Cargando...</div>)
        }


    }
}

export default Consumo;