import React from "react";
import LoginForm from "../forms/loginForm";
import googleLogo from "../../google.png"

function Login() {
    return (
        <div className="container-fluid p-5 bg-black text-white">
            <div className="col-3">
                <h1>Log in</h1>

                <LoginForm/>

                <hr/>
                <a className="btn btn-outline-light w-100"
                   href="http://localhost:8080/oauth2/authorize/google">
                    <img src={googleLogo} height="20" width="20" className="mx-2 my-1" alt=""/>
                    Sign up with Google
                </a>
                <div style={{textAlign: "center"}}>
                    <small>
                        Don't have an account? <a href={"/signup"}> Sign up! </a>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Login;