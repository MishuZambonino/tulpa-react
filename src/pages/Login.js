import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';
import { SignInAdmin } from "../services/firebase/auth";
import {useContext, useEffect, useState} from "react";
import "../App.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler =
        (event,email, password) => {
            event.preventDefault();
        };

        return (
            <div className="login-container">
                <div className="login-div">
                    <h1 className="login-title">Iniciar sesión</h1>
                    <span className="p-float-label">
                    <InputText id="in" className="w-100" onChange={(event) => setEmail(event.target.value)}/>
                    <label htmlFor="in">Email</label>
                </span>
                    <span className="p-float-label">
                    <Password toggleMask feedback={false} id="inPassword" onChange={(event) => setPassword(event.target.value)}/>
                    <label htmlFor="inPassword">Contraseña</label>
                </span>
                    <div className="forgot-password-div">
                        <a href="./">Olvidé mi contraseña</a>
                    </div>
                    <div className="sign-in-button-div">
                        <Button type="button" label="Ingresar" className="login-button" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}/>
                    </div>
                </div>
            </div>
        );
    };

export default Login;
