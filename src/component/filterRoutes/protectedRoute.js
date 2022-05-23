import {useNavigate} from "react-router-dom"
import renewAccessToken from "../authentication/renewAccessToken";
import {useEffect, useState} from "react";

// export default function ProtectedRoute({children}) {
//     let navigate = useNavigate();
//
//     useEffect(() => {
//         if (document.cookie.indexOf("accessTokenClone=") === -1) {
//             renewAccessToken().then(ifSuccessful => {
//                 if (!ifSuccessful)
//                     navigate("/login");
//             })
//         }
//     }, [navigate])
//     return children;
// }
export default function ProtectedRoute({children}) {
    let navigate = useNavigate();
    const [authenticated, setAuth] = useState(document.cookie.indexOf("accessTokenClone=") !== -1);

    useEffect(() => {
        if (document.cookie.indexOf("accessTokenClone=") === -1) {
            renewAccessToken().then(ifSuccessful => {
                setAuth(ifSuccessful);
                if (!ifSuccessful)
                    navigate("/login");
            })
        }
    }, [navigate])
    return (authenticated) ? children : null;
}