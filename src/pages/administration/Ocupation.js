import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {AuthContext} from "../../App";
import {useContext} from "react";

function Ocupation() {
    const {user} = useContext(AuthContext);

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
                <p>{user.uid}</p>
            </div>
        </div>
    );
}

export default Ocupation
