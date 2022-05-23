import {Navigate} from "react-router-dom";
import renewAccessToken from "../authentication/renewAccessToken";
import {useEffect, useState} from "react";

export default  function IfNotAuthenticated({children}) {
    const [authenticated, setAuth] = useState(document.cookie.indexOf("accessTokenClone=") !== -1);

    useEffect(() => {
        if (document.cookie.indexOf("accessTokenClone=") === -1) {
            renewAccessToken().then(ifSuccessful => setAuth(ifSuccessful))
        }
    })
    return (authenticated) ? <Navigate to="/"/> : children;
}