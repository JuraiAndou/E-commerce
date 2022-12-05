import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import SaleComponent from "./Layout/SaleComponent";


const UserSales = () => {

    const [sales, setSales] = useState([]);

    async function getUserSales(){ // Pegar as vendas do banco de dados
        try {

            const response = await fetch("http://localhost:5000/sales/get-specific-sales", {
                method: 'GET',
                headers: { token: localStorage.token}
            });
            
            const parseRes = await response.json();
            console.log("Vendas: ");
            console.log(parseRes);
            setSales(parseRes);

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getUserSales();
    },[]);

    return(
        <Fragment>
            <h1>Compras</h1>
            <div className="d-flex p-2 flex-wrap">
            {sales.length > 0 &&
                sales.map((sale) =>(
                    <SaleComponent id_sale={sale.id} id_user={sale.id_user} user_name={sale.user_name} product_description={sale.descricao} product_price={sale.preco} amount={sale.quantidade} date_time={sale.data_hora} />
                ))
            }
            </div>

        </Fragment >
    )
}

export default UserSales;