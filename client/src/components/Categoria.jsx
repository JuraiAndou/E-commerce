import React, { Fragment, useState, useEffect } from "react";
import CategoryComponent from "./Layout/CategoryComponent";

const Categoria= (props) => {
    const [categoria, setCategoria] = useState([]) 

    async function getCategorias() {// Gets the user name from the dashboard Server Route
        try {
            const response = await fetch("http://localhost:5000/category/get-categories", {
                method: 'GET',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()
            setCategoria(parseRes)
            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getCategorias()
    },[])

    return(
        <Fragment>
            <h1 className="text-center my-5">Categorias</h1>
            <div className="d-flex p-2 flex-wrap"> 
            {categoria.length > 0 &&
                categoria.map((categoria) =>(
                    <CategoryComponent id={categoria.id} nome={categoria.descricao}/>
                ))
            }
            </div>
        </Fragment>
    )
}

export default Categoria