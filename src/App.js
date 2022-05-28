import React from "react"
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
import Game from "./component/game";
import ScoresTable from "./component/scoresTable";
import ConfirmSignUp from "./component/authentication/confirmSignUp";
import ConfirmPasswordReset from "./component/authentication/confirmPasswordReset";
// import Amplify from 'aws-amplify';
// import awsExports from './aws-exports';
//
// Amplify.configure(awsExports);

const App = () => {
    return useRoutes([
        {path: "/login", element: <IfNotAuthenticated><Login/></IfNotAuthenticated>},
        {path: "/oauth2-login", element: <Oauth2LoginResponse/>},
        {path: "/signup", element: <Signup/>},
        {path: "/confirm-signup", element: <ConfirmSignUp/>},
        {path: "/", element: <ProtectedRoute><Game/></ProtectedRoute>},
        {path: "/scores-table", element: <ScoresTable/>},
        {path: "/change-password", element: <ProtectedRoute><ChangePassword/></ProtectedRoute>},
        {path: "/reset-password", element: <ResetPassword/>},
        {path: "/confirm-password-reset", element: <ConfirmPasswordReset/>},
        {path: "/change-nickname", element: <ProtectedRoute><ChangeNickname/></ProtectedRoute>}
    ]);
}

const AppWrapper = () => {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
};

export default AppWrapper;
