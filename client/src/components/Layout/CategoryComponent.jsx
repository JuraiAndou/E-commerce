import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const CategoryComponent = ({id, descricao}) => {
    const cardStyle = {
        minWidth: '250px',
        margin:'20px'
    }
    async function remove(e) {// Gets the user name from the dashboard Server Route
        try {
            const response = await fetch("http://localhost:5000/category/remove-category?cat=" + id, {
                method: 'POST',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()
            window.location.reload(false)
        } catch (err) {
            console.error(err.message);
        }
    }

    const [isEditing, setIsEditing] = useState(false)

    const setEditing = boolean => {
        setIsEditing(boolean)
    }

    async function edit(e) {
        e.preventDefault()
        try {
            setEditing(!isEditing)
        } catch (err) {
            console.error(err.message);
        }
    }

    /**
     * Form input management
     */
     const [inputs, setInputs] = useState({
        cat_descricao: descricao,
    })// So you can store the value of the input

    const { cat_descricao } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    /**
     * Edit form submit function
     */
     const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const descricao = cat_descricao

            const body = { descricao }
            console.log(body)
            const response = await fetch("http://localhost:5000/category/update-category?cat=" + id, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json', token: localStorage.token },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()
            window.location.reload(false)
        } catch (err) {
            console.error(err.message);
            toast.error('🚫 Product Info Update Fail')
        }
    }

    return(
            <div className="card" style={cardStyle}>
                <div className="card-body">
                {!isEditing ? (
                    <Fragment>
                        <h5 className="card-title">{descricao}</h5>
                    </Fragment>
                ) : (
                    <form onSubmit={onSubmitForm}>
                        <input
                            type="text"
                            name="cat_descricao"
                            placeholder="descrição"
                            className="form-control my-3"
                            value={cat_descricao}
                            onChange={e => onChange(e)}
                        />
                        <div className="d-grid gap-2 my-3">
                            <button className="btn btn-primary btn-success">Submit</button>
                        </div>
                    </form>
                )}
                </div>
                <Fragment>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                                className="btn btn-primary"
                                onClick={e => edit(e)}
                            >Edit</button>
                            <button
                                className="btn btn-danger"
                                onClick={e => remove(e)}
                            >Remove</button>
                        </div>
                    </Fragment>
            </div>
   
    )
}

export default CategoryComponent