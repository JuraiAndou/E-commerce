import React, { Fragment, useState, useEffect } from "react";
import ProductComponent from "./Layout/ProductComponent";

const Home = (props) => {
    const [products, setProducts] = useState([]) 

    async function getProdutcs() {// Gets the user name from the dashboard Server Route
        try {
            const response = await fetch("http://localhost:5000/product/get-productsWithCategory", {
                method: 'GET',
                headers: { token: localStorage.token }
            })
            const parseRes = await response.json()
            console.log("PEGANDO PRODUTOS E CATEGORIAS");
            console.log(parseRes);
            

            /*
            console.log("pegando Produtos:");
            parseRes.map(async(p)=>{
                p.categoria = await getCategory(p.id)[0].descricao
            })

            console.log("ParseRes: ");
            console.log(parseRes);
            */
            setProducts(parseRes)
            
        } catch (err) {
            console.error(err.message);
        }
    }

    
    const [categoria, setCategoria] = useState([]);
    
    async function getCategorias(){
        try {
            const response = await fetch("http://localhost:5000/category/get-categories", 
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token: localStorage.token}
            }
            )
            
            const parseRes = await response.json();
            console.log("OLHA AS CATEGORIAS: ");
            console.log(parseRes);
            setCategoria(parseRes);
            

        } catch (err) {
            console.error(err.message);
        }
    }

    //*/



    useEffect(()=>{
        getProdutcs()
        getCategorias();
    },[])

    return(
        <Fragment>
            <h1 className="text-center my-5">Produtos</h1>
            <div className="d-flex p-2 flex-wrap"> 
            {console.log("OLHA OS CATS")}
            {console.log(categoria)}
            {products.length > 0 &&
                products.map((product) =>(
                        <ProductComponent id={product.id} nome={product.descricao} preco={product.preco} quantidade={product.quantidade} categoria={product.categoria_descricao} categorias={categoria} id_categoria={product.id_categoria} key={product.id} isAdministrator={props.isAdministrator}/>       
                ))
            }
            </div>
        </Fragment>
    )
}

export default Home