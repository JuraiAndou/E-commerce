import React, { Fragment, useState, useEffect } from "react";

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

    return(
            <div className="card" style={cardStyle}>
                <div className="card-body">
                    <h5 className="card-title">{descricao}</h5>
                </div>
                <Fragment>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                                className="btn btn-primary"
                               
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