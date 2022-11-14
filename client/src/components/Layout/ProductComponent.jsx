import React, { Fragment, useState, useEffect } from "react";

const ProductComponent = ({id, nome, preco}) => {
    const cardStyle = {
        minWidth: '250px',
        margin:'20px'
    }
    return(
      
            <div className="card" style={cardStyle}>
                <img src="https://via.placeholder.com/250" class="card-img-top" alt="Produto"></img>
                <div className="card-body">
                    <h5 className="card-title">{nome}</h5>
                    <p className="card-text">{preco}</p>
                </div>
            </div>
   
    )
}

export default ProductComponent