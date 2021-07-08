import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';
import "../App.css"

function Login() {
    return (
        <div className="login-container">
            <div className="login-div">
                <span className="p-float-label">
                    <InputText id="in" className="w-100"/>
                    <label htmlFor="in">Email</label>
                </span>
                <span className="p-float-label">
                    <Password toggleMask feedback={false} id="inPassword" className=""/>
                    <label htmlFor="inPassword">Password</label>
                </span>
                <div className="sign-in-button">
                    <Button type="button" label="Ingresar"/>
                </div>
            </div>
        </div>
    );
}

export default Login
