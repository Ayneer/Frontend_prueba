import React from 'react';
import './iniciarSesion.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

let usuario = null;

class IniciarSesion extends React.Component {

    respuesta = [];

    constructor() {
        super();

        this.state = {
            correo: "",
            contraseña: "",
            contraseña_1: "",
            mensaje: "",
            cambiarClave: false,
            mensajeClave: "Ingrese su contraseña",
            mostrarIniciarS: false
        }

        this.capturarInput = this.capturarInput.bind(this);
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.cambiarClave = this.cambiarClave.bind(this);

    }
    
    capturarInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    //Metodo para iniciar sesion
    iniciarSesion(e) {

        e.preventDefault();
        fetch('http://192.168.1.54:3500/iniciarSesion', {//Solicitud de inicio de sesion
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ correo: this.state.correo, contraseña: this.state.contraseña }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();//Analiza respuesta de servidor
        }).then(res => {
            if (res.Estado) {//Si NO hubo error al iniciar sesion
                usuario = res.usuario;
                if (!res.activo) {
                    this.setState({
                        cambiarClave: true,
                        mensajeClave: "Repita su contrasena",
                        contraseña: ""
                    });
                } else {
                    // const socket = this.props.socket;//Me suscribo al socket del servidor
                    let socket = this.props.crearSocket2();
                    this.props.activarSocket(socket);
                    socket.emit('mi_correo', usuario.correo);//Emitir correo por socket
                    socket.on('recibido', (dato) => {//Si se acepta el correo puedo iniciar sesion
                        if (dato) {
                            this.props.history.push('/app');// Se redirecciona a la app 
                        }
                    });
                }


            } else {
                //Mensaje de error de falla en inicio de sesion 
            }

        }).catch(error => console.error('Error:', error));
    }

    cambiarClave(e) {
        e.preventDefault();
        console.log("Cambiando clave...");
        if (this.state.contraseña === this.state.contraseña_1) {
            if (this.state.contraseña_1 !== usuario.correo) {
                console.log("Cambiando clave 2...");
                fetch('http://192.168.1.54:3500/cliente/' + usuario.correo, {//Solicitud cambio de contrase
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify({ sesionP: true, contraseña: this.state.contraseña }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                }).then(function (response) {
                    return response.json();//Analiza respuesta de servidor
                }).then(res => {
                    console.log(res);
                    if (res.estado) {
                        console.log("clave cambiada con exito");
                        const socket = this.props.socket;//Me suscribo al socket del servidor
                        socket.emit('mi_correo', usuario.correo);//Emitir correo por socket
                        socket.on('recibido', (dato) => {//Si se acepta el correo puedo iniciar sesion
                            if (dato) {
                                this.props.history.push('/app');// Se redirecciona a la app 
                            }
                        });
                    } else {
                        console.log("Error al cambiar clave");
                    }
                });
            } else {
                console.log("clave igual que correo!");
                console.log("claves1: ", this.state.contraseña_1);
                console.log("claves2: ", this.state.contraseña);
                console.log(usuario);
                // contrase;a igual al correo
            }
        } else {
            console.log("claves diferentes");
            console.log("claves1: ", this.state.contraseña_1);
            console.log("claves2: ", this.state.contraseña);
            // contrase;as diferentes
        }

    }

    componentDidMount(){
        fetch('http://192.168.1.54:3500/estoyAutenticado', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(res => {//Analiza la respuesta del servidor
            if (res.estado){//Si la sesion esta activa 
                this.props.history.push('/app');// Se redirecciona a app
            }else{
                this.setState({
                    mostrarIniciarS: true
                });
            }
        }).catch(error => console.error('Error:', error));
    }

    render() {
        if (this.state.mostrarIniciarS) {
            const { cambiarClave, mensajeClave } = this.state;
            return (
                <div>

                    {/* <Navbar soyYo='inicioSesion' /> */}
                    <div className="row">
                        <div className="card iniciarSesion col-sm-12 col-md-6" >
                            <div id="cuadroForm" className="card-body">
                                <h5 className="card-title">Iniciar Sesion</h5>
                                <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: "none" }}>
                                    <strong>{this.state.mensaje}f</strong>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form>
                                    {cambiarClave
                                        ?
                                        <div className="form-group ">
                                            <input type="password" className="campo form-control" placeholder="Ingrese su contraseña" name="contraseña_1" value={this.state.contraseña_1} onChange={this.capturarInput} required />
                                        </div>
                                        :
                                        <div className="form-group">
                                            <input id="campo1" type="email" className="campo form-control" ria-describedby="emailHelp" placeholder="Ingrese su correo" name="correo" value={this.state.correo} onChange={this.capturarInput} required />
                                        </div>
                                    }

                                    <div className="form-group ">
                                        <input type="password" className="campo form-control" placeholder={mensajeClave} name="contraseña" value={this.state.contraseña} onChange={this.capturarInput} required />
                                    </div>
                                    {
                                        cambiarClave
                                            ?
                                            <button id="btnIngresar" className="btn btn-primary" onClick={this.cambiarClave}>Cambiar clave</button>
                                            :
                                            <button id="btnIngresar" className="btn btn-primary" onClick={this.iniciarSesion}>Ingresar</button>
                                    }

                                </form>
                            </div>
                        </div>
                    </div>

                    <Footer />

                </div>
            )
        }else{
            return (<div>Cargando ...</div>);
        }

    }
}

export default IniciarSesion;