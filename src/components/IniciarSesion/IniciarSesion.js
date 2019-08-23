import React from 'react';
import './iniciarSesion.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

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

    capturarRespuestaServidor(respuestaS) {
        if (!respuestaS.usuario) {
            //Se añade la respuesta y se hace visible la alerta
            this.setState({
                mensaje: respuestaS.mensage
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
        }).then(res => this.capturarRespuestaServidor(res)).catch(error => console.error('Error:', error));
    }

    render() {

        return (
            <div>
                <Navbar soyYo='inicioSesion' />
                <div className="card iniciarSesion " >
                    <div id="cuadroForm" className="card-body">
                        <h5 className="card-title">Iniciar Sesion</h5>
                        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: "none" }}>
                            <strong>{this.state.mensaje}f</strong>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form>
                            <div className="form-group">
                                <input type="email" className="campo form-control" ria-describedby="emailHelp" placeholder="Ingrese su correo" name="correo" value={this.state.correo} onChange={this.capturarInput} required />
                            </div>

                            <div className="form-group ">
                                <input type="password" className="campo form-control" placeholder="Ingrese su contraseña" name="contraseña" value={this.state.contraseña} onChange={this.capturarInput} required />
                            </div>
                            <button id="btnIngresar" className="btn btn-primary" onClick={this.iniciarSesion}>Ingresar</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default IniciarSesion;