import React from "react";
import SignupForm from "../forms/signupForm";

function Signup() {
    return (
        <div className="container-fluid p-5 bg-black text-white">
            <div className="col-3">
                <h1>Sign up</h1>
                <SignupForm/>
                <div style={{textAlign: "center"}} className="">
                    <small>
                        Already have an account? <a href={"/login"}> Log in! </a>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Signup;