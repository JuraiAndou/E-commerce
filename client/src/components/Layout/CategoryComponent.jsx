import React, { Fragment, useState, useEffect } from "react";

const CategoryComponent = ({id, descricao}) => {
    const cardStyle = {
        minWidth: '250px',
        margin:'20px'
    }
    return(
            <div className="card" style={cardStyle}>
                <div className="card-body">
                    <h5 className="card-title">{descricao}</h5>
                </div>
            </div>
   
    )
}

export default CategoryComponent