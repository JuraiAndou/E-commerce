import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const SaleComponent = ({id_sale, id_user, user_name, product_description, product_price, amount, date_time}) => {
    console.log(id_user);
    return(
        <tr>
            <td>{id_sale} </td> 
            <td>{id_user} </td>
            <td>{user_name}</td>
            <td>{product_description} </td>
            <td>{product_price}</td>
            <td>{amount} </td>
            <td>{date_time}</td>
        </tr>
    );
}


export default SaleComponent;