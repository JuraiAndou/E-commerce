import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const SaleComponent = ({id_sale, id_user, user_name, product_description, product_price, amount, date_time}) => {
    console.log(id_user);
    return(
        <div>
            <span>{id_sale} | </span> 
            <span>{id_user} | </span>
            <span>{user_name} | </span>
            <span>{product_description} | </span>
            <span>{product_price} | </span>
            <span>{amount} | </span>
            <span>{date_time} | </span>
            
        </div>
    );
}


export default SaleComponent;