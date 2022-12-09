import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import CategoryProductComponent from "./Layout/CategoryProductComponent";

const CategoryProduct = () => {

    const [categoria, setCategoria] = useState([]);

    async function getCategorias(){
        try {
            //console.log("bingus");
            const response = await fetch("http://localhost:5000/category/get-categories",{
                method: "GET",
                headers: {token: localStorage.token}
            });
            
            const parseRes = await response.json();
            //console.log(parseRes);
            setCategoria(parseRes);


        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getCategorias();
    },[]);

    return(
        <Fragment>
            <h1 className="text-center my-5">Categorias</h1>
            <div className="d-flex p-2 flex-wrap"> 
            {categoria.length > 0 &&
                categoria.map((catego) =>(
                    <CategoryProductComponent id_categoria={catego.id} nome_categoria={catego.descricao} key={catego.id}/>
                ))
            }
            </div>
        </Fragment>
    );
}

export default CategoryProduct