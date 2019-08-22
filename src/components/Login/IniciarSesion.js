import React from 'react';
import './iniciarSesion.css';

class IniciarSesion extends React.Component {

    respuesta = [];

    constructor() {
        super();

        this.state = {
            correo: "",
            contraseña: "",
            mensaje: ""
        }

        this.capturarInput = this.capturarInput.bind(this);
        this.iniciarSesion = this.iniciarSesion.bind(this);
    }

    capturarInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    capturarMensaje(mensaje) {
        this.respuesta = mensaje;
        if (!mensaje.usuario) {
            this.setState({
                mensaje: mensaje.mensage
            });
        } else {
            // Se redirecciona a la app 
            this.props.history.push('/app');
        }
    }

    iniciarSesion(e) {

        e.preventDefault();
        fetch('http://localhost:3500/iniciarSesion', {
            method: 'POST',
            body: JSON.stringify({ correo: this.state.correo, contraseña: this.state.contraseña }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(res => this.capturarMensaje(res)).catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div className="card iniciarSesion " >
                <div className="card-body">
                    <h5 className="card-title">
                    Iniciar Sesion
                    </h5>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{display: "none"}}>
                    <strong>{this.state.mensaje}f</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <form>
                    <div className="form-group">
                        <input type="email" className="form-control" ria-describedby="emailHelp" placeholder="Ingrese su correo" name="correo" value={this.state.correo} onChange={this.capturarInput} required />
                    </div>

                    <div className="form-group ">
                        <input type="password" className="form-control" placeholder="Ingrese su contraseña" name="contraseña" value={this.state.contraseña} onChange={this.capturarInput} required /></div>
                        
                        <button className="btn btn-primary" onClick={this.iniciarSesion}>Iniciar sesion</button>
                    
                </form>
                </div>
                

            </div>
        )
    }
}

export default IniciarSesion;