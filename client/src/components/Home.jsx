import React, { Fragment, useState, useEffect } from "react";
import ProductComponent from "./Layout/ProductComponent";

const Home = (props) => {
    const [products, setProducts] = useState([]) 

    async function getProdutcs() {// Gets the user name from the dashboard Server Route
        try {
            const response = await fetch("http://localhost:5000/home/get-products", {
                method: 'GET',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()
            setProducts(parseRes)
            
        } catch (err) {
            console.error(err.message);
        }
    }

    
    //const [category, setCategory] = useState({id: "", descricao: ""});
    /*
    async function getCat(id_produto){
        try {
            console.log("bingus: ");
            console.log(id_produto);
            const body = {id_produto}

            const response = await fetch("http://localhost:5000/category/get-category", 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: localStorage.token},
                body: JSON.stringify(body)
            }
            )
            console.log("abuble");
            console.log("");
            const parseRes = await response.json();
            console.log("BINGUS");
            console.log(parseRes.descricao);
            //setCategory(parseRes.descricao);
            return parseRes
        } catch (err) {
            console.error(err.message);
        }
    }

    */
    useEffect(()=>{
        getProdutcs()
    },[])

    return(
        <Fragment>
            <h1 className="text-center my-5">Produtos</h1>
            <div className="d-flex p-2 flex-wrap"> 
            {products.length > 0 &&
                products.map((product) =>(
                    <ProductComponent id={product.id} nome={product.descricao} preco={product.preco} key={product.id} isAdministrator={props.isAdministrator}/>
                ))
            }
            </div>
        </Fragment>
    )
}

export default Home