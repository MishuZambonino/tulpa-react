import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';
import "../App.css"

function Ocupation() {
    return (
        <div className="login-container">
            <div className="login-div">
                <h1 className="login-title">Iniciar sesión</h1>
                <span className="p-float-label">
                    <InputText id="in" className="w-100"/>
                    <label htmlFor="in">Email</label>
                </span>
                <span className="p-float-label">
                    <Password toggleMask feedback={false} id="inPassword" className=""/>
                    <label htmlFor="inPassword">Contraseña</label>
                </span>
                <div className="forgot-password-div">
                    <a href="./">Olvidé mi contraseña</a>
                </div>
            </div>
        </div>
    );
}

export default Ocupation
