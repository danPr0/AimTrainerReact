import React from "react";
import ChangeNicknameForm from "../forms/changeNicknameForm";
import Menu from "../menu";

export default function ChangeNickname() {
    return (
        <div className="container-fluid p-5 bg-black text-white">
            <div>
                <Menu/>
            </div>

            <div className="col-3">
                <h1>Change nickname</h1>
                <ChangeNicknameForm/>
            </div>
        </div>
    );
}