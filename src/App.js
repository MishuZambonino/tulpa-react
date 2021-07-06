import React from "react";
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';

function Login() {
    return (
        <div>
            <span className="p-float-label">
                <InputText id="in" value={value} />
                <label htmlFor="in">Username</label>
            </span>
            <Password value={value} />
        </div>
    );
}

export default Login
