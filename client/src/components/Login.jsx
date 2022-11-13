import React, { Fragment } from "react";

const Login = (props) => {
    return (
        <Fragment>
            <h1>Login</h1>
            <button onClick={() => props.setAuth(true)}>Authenticate</button>
        </Fragment>
    )
}

export default Login