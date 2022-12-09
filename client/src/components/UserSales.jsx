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
            <h1>Historico de compras</h1>
            <table width="400" cellPadding="5"
                    className="table table table-striped-columns shadow p-3 mb-5 bg-body rounded">
                    <thead>
                        <tr >
                            <th>ID VENDA</th>
                            <th>ID USUARIO</th>
                            <th>CLIENTE</th>
                            <th>PRODUTO</th>
                            <th>PREÇO</th>
                            <th>QUANTIDADE</th>
                            <th>DATA</th>
                        </tr>
                        {sales.length > 0 &&
                        sales.map((sale) =>(
                            <SaleComponent id_sale={sale.id} id_user={sale.id_user} user_name={sale.user_name} product_description={sale.descricao} product_price={sale.preco} amount={sale.quantidade} date_time={sale.data_hora} />
                        ))
                        }
                    </thead>
                    
            </table>
            <div className="card" >
                <div className="list-group list-group-flush" >
                
                </div>
            </div>
        </Fragment >
    )
}

export default UserSales;