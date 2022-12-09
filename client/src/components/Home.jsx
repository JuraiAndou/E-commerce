import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
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

    async function getCategorias() {
        try {
            const response = await fetch("http://localhost:5000/category/get-categories",
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', token: localStorage.token }
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



    useEffect(() => {
        getProdutcs()
        getCategorias();
    }, [])

    // Recuperar o carrinho a partir do Local Storage
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('carrinho')) // "[]"
    const parseRes = cartFromLocalStorage === null ? [] : cartFromLocalStorage
    const [cart, setCart] = useState(parseRes);

    /*
    useEffect(()=>{
        localStorage.setItem("carrinho", JSON.stringify(cart));
    },[cart])
    */

    const addCart = (e, newItem) => {

        let encontrou = false;

        const existe = cart.find((p) => p.id === newItem.id);

        if (existe) {
            setCart(
                cart.map((x) =>
                    x.id === newItem.id ? { ...existe, quantidade: existe.quantidade + 1 } : x
                )
            );
        } else {
            setCart([...cart, { ...newItem, quantidade: 1 }])
        }
        /*
        if(cart.length === 0){
            setCart((prevItem) => [
                {id: newItem.id, nome: newItem.descricao, preco: newItem.preco, quantidade: 1}
            ])
        }else{
            setCart((prevItem) => [
                ...prevItem, {id: newItem.id, nome: newItem.descricao, preco: newItem.preco, quantidade: 1}
            ])
        }
        */
    }

    const removeCart = (e, item) => {
        const existe = cart.find((p) => p.id === item.id);

        if (existe.quantidade === 1) { // deixa apenas os opjetos que não têm o id passado
            setCart(cart.filter((x) => x.id !== item.id))
        } else {
            setCart(
                cart.map((x) =>
                    x.id === item.id ? { ...existe, quantidade: existe.quantidade - 1 } : x
                )
            )
        }
    }

    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(cart));
    }, [cart])



    const finishCart = async (e) => {
        e.preventDefault()
        try {
            const body = cart
            console.log("Começando finishCart");
            const response = await fetch('http://localhost:5000/sales/post-sale',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', token: localStorage.token },
                    body: JSON.stringify(body)
                })

            const parseRes = await response.json();
            if (parseRes == '') {
                toast.error('produto fora de estoque')
            } else {
                setCart([]);
                localStorage.removeItem("carrinho")
                window.location.reload()
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Produtos</h1>
            <div className="d-flex p-2 flex-wrap"> 
            {/*console.log("OLHA OS CATS")*/}
            {/*console.log(categoria)*/}
            {products.length > 0 &&
                products.map((product) =>(
                    <Fragment key={product.id}>
                        <ProductComponent add={addCart} id={product.id} nome={product.descricao} preco={product.preco} quantidade={product.quantidade} categoria={product.categoria_descricao} categorias={categoria} id_categoria={product.id_categoria} key={product.id} isAdministrator={props.isAdministrator} isAuthenticated={props.isAuthenticated}/>       
                        {/*<button onClick={(e) => {addCart(e, product)}} className="btn btn-primary">Adicionar</button>*/}
                    </Fragment>
                ))
            }
            </div>

            <hr />
            <h1 className="text-center my-5">Carrinho</h1>
            <div>
                {console.log("Pegando o pessoal do Cart")}
                {console.log(cart)}
                {
                    cart.length > 0 &&
                    cart.map((prod) => (
                        <Fragment key={prod.id}>
                            <p>
                                <span>{prod.id} | </span>
                                <span>{prod.descricao} | </span>
                                <span>R$ {prod.preco} | </span>
                                <span>{prod.quantidade} itens | </span>
                                <button onClick={(e) => { removeCart(e, prod) }} className="btn btn-danger">Remover</button>
                                <br />
                            </p>
                        </Fragment>
                    ))
                }
                {
                    cart.length > 0 ? (
                        <button onClick={(e) => { finishCart(e) }} className="btn btn-success">Comprar</button>
                    ) : (
                        <Fragment></Fragment>
                    )
                }

            </div>


        </Fragment>
    )
}

export default Home