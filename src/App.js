import React, {useEffect} from "react"
import {BrowserRouter, useRoutes} from "react-router-dom";
import "./bootstrap.css";
import Login from "./component/authentication/login";
import Signup from "./component/authentication/signup";
import ProtectedRoute from "./component/filterRoutes/protectedRoute";
import Oauth2LoginResponse from "./component/authentication/oauth2LoginRespose";
import IfNotAuthenticated from "./component/filterRoutes/ifNotAuthenticated";
import ChangeNickname from "./component/user/changeNickname";
import ChangePassword from "./component/user/changePassword";
import ResetPassword from "./component/user/resetPassword";
import Welcome from "./component/welcome";
import ScoresTable from "./component/scoresTable";
// import Amplify from 'aws-amplify';
// import awsExports from './aws-exports';
//
// Amplify.configure(awsExports);

const App = () => {
    return useRoutes([
        {path: "/login", element: <IfNotAuthenticated><Login/></IfNotAuthenticated>},
        {path: "/oauth2-login", element: <IfNotAuthenticated><Oauth2LoginResponse/></IfNotAuthenticated>},
        {path: "/signup", element: <IfNotAuthenticated><Signup/></IfNotAuthenticated>},
        {path: "/welcome", element: <ProtectedRoute><Welcome/></ProtectedRoute>},
        {path: "/scores-table", element: <ScoresTable/>},
        {path: "/change-password", element: <ProtectedRoute><ChangePassword/></ProtectedRoute>},
        {path: "/reset-password", element: <ResetPassword/>},
        {path: "/change-nickname", element: <ProtectedRoute><ChangeNickname/></ProtectedRoute>}
    ]);
}

const AppWrapper = () => {
    useEffect(() => {
        const id = setInterval(() => {
            localStorage.removeItem("authenticated");
        }, 15 * 60 * 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
};

export default AppWrapper;
