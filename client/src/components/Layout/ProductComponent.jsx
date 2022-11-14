import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const ProductComponent = ({ id, nome, preco: price, isAdministrator }) => {

    /**
     * Editing State
     */
    const [isEditing, setIsEditing] = useState(false)

    const setEditing = boolean => {
        setIsEditing(boolean)
    }

    const cardStyle = {
        minWidth: '250px',
        margin: '20px'
    }

    async function remove(e) {// Gets the user name from the dashboard Server Route
        try {
            const response = await fetch("http://localhost:5000/product/remove-product?prod=" + id, {
                method: 'POST',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()
            window.location.reload(false)
        } catch (err) {
            console.error(err.message);
        }
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
        prod_descricao: nome,
        prod_preco: price
    })// So you can store the value of the input

    const { prod_descricao, prod_preco } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    /**
     * Edit form submit function
     */
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const descricao = prod_descricao
            const preco = prod_preco
            const body = { descricao, preco }
            console.log(body)
            const response = await fetch("http://localhost:5000/product/update-product?prod=" + id, {
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

    return (

        <div className="card" style={cardStyle}>
            <img src="https://via.placeholder.com/250" className="card-img-top" alt="Produto"></img>
            <div className="card-body">
                {!isEditing ? (
                    <Fragment>
                        <h5 className="card-title">{nome}</h5>
                        <p className="card-text">{price}</p>
                    </Fragment>
                ) : (
                    <form onSubmit={onSubmitForm}>
                        <input
                            type="text"
                            name="prod_descricao"
                            placeholder="descrição"
                            className="form-control my-3"
                            value={prod_descricao}
                            onChange={e => onChange(e)}
                        />
                        <input
                            type="number"
                            name="prod_preco"
                            placeholder="preço"
                            className="form-control my-3"
                            value={prod_preco}
                            onChange={e => onChange(e)}
                        />
                        <div className="d-grid gap-2 my-3">
                            <button className="btn btn-primary btn-success">Submit</button>
                        </div>
                    </form>
                )}
                {isAdministrator ? (
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
                ) : (
                    <span></span>
                )}
            </div>
        </div>

    )
}

export default ProductComponent