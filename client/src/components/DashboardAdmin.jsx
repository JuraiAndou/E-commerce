import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const DashbordAdmin = (props) => {

    const [name, setName] = useState("")

    async function getName() {// Gets the user name from the dashboard Server Route
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: 'GET',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()

            setName(parseRes.user_name)
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault()// Prevents a refresh
        localStorage.removeItem('token')
        props.setAuth(false)
        toast.success("Logged out successfully")
    }

    useEffect(() => {// Called everytime the component is rendered
        getName()
    }, [])

    return (
        <Fragment>
            <h1>Dashboard Admin</h1>
            <p>Hello <strong>{name.split(' ')[0]}</strong></p>
            <button
                className="btn btn-primary"
                onClick={e => logout(e)}
            >Logout</button>
        </Fragment>
    )
}

export default DashbordAdmin