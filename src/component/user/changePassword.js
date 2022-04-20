import React from "react";
import ChangePasswordForm from "../forms/changePasswordForm";
import Menu from "../menu";

export default function ChangePassword() {
    return (
        <div className="container-fluid p-5 bg-black text-white">
            <div>
                <Menu/>
            </div>
            <div className="col-3">
                <h1>Change password</h1>
                <ChangePasswordForm/>
            </div>
        </div>
    );
}