import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function Oauth2LoginResponse() {
    const navigate = useNavigate();

    useEffect(() => {
        let urlString = window.location.href;
        let urlParams = new URL(urlString).searchParams;
        console.log(urlParams);

        if (urlParams) {
            let accessToken = urlParams.get("accessToken");
            let refreshToken = urlParams.get("refreshToken");

            axios
                .get(`auth/get-cookies?accessToken=${accessToken}&refreshToken=${refreshToken}`)
                .then(() => {
                    localStorage.setItem("authenticated", "true");
                    localStorage.setItem("username", urlParams.get("username"));
                    navigate("/welcome");
                })
                .catch(() => navigate("/login"));
        }
        else navigate("/login");
    });

    return null;
}