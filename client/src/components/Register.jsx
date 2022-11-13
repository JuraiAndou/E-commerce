import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = (props) => {

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: ''
    })// So you can store the value of the iputs

    const { email, password, name } = inputs// Destructure the inputs

    const onChange = (e) => {// Updates the stored values
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()// Prevents a refresh
        try {

            const body = { email, password, name }

            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()
            if (parseRes.token) {
                localStorage.setItem('token', parseRes.token)

                props.setAuth(true)
                toast.success("Registered Successfully")
            } else {
                props.setAuth(false)
                toast.error(parseRes)
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-control my-3"
                    value={email}
                    onChange={e => onChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control my-3"
                    value={password}
                    onChange={e => onChange(e)}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="form-control my-3"
                    value={name}
                    onChange={e => onChange(e)}
                />
                <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-success">Submit</button>
                </div>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    )
}

export default Register