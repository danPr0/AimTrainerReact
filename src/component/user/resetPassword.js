import React from "react";
import ResetPasswordForm from "../forms/resetPasswordForm";

export default function ResetPassword() {
    return (
        <div className="container-fluid p-5 bg-black text-white">
            <div className="col-3">
                <h1>Reset password</h1>
                <ResetPasswordForm/>
            </div>
        </div>
    );
}