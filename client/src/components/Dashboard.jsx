import React, { Fragment } from "react";

const Dashbord = (props) => {
    return (
        <Fragment>
            <h1>Dashboard</h1>
            <button onClick={() => props.setAuth(false)}>Logout</button>
        </Fragment>
    )
}

export default Dashbord