import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';


const CategoryProductComponent = ({id_categoria, nome_categoria}) => {

    const cardStyle = {
        minWidth: '250px',
        margin: '10px'
    }

    const [products, setProducts] = useState([]);

    async function getProducts(id_categoria){
        try {
            const body = {id_categoria}
            const response = await fetch("http://localhost:5000/category/get-products-category?id_categoria=" + id_categoria,
            {
                method: 'POST',
                headers: { token: localStorage.token },
                body: id_categoria
            });
            console.log(body);
            console.log("Carregando produtos da categoria: ");
            console.log(id_categoria);
            const parseRes = await response.json();
            console.log(parseRes);
            setProducts(parseRes);

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getProducts(id_categoria);
    }, []);

    return(
        <div className="card" style={cardStyle}>
            <div className="card-body"> 
            
                <h5 className="text-center my-5">{nome_categoria}</h5>
                {products.length > 0 &&
                    products.map((product) =>(
                        <p key={product.id}>
                            <span>{product.id} | </span>
                            <span>{product.descricao} | </span>
                            <span>{product.preco} | </span>
                            <span>{product.quantidade} |  | </span>
                            <br/>
                        </p>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryProductComponent;