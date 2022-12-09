import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const ProductComponent = ({add, id, nome, preco: price, quantidade, categoria, categorias, id_categoria, isAdministrator, isAuthenticated}) => {

    /**
     * Editing State
     */
    const [isEditing, setIsEditing] = useState(false)

    const setEditing = boolean => {
        setIsEditing(boolean)
    }

    const cardStyle = {
        minWidth: '250px',
        margin: '20px'
    }

    async function remove(e) {// Gets the user name from the dashboard Server Route
        try {
            const response = await fetch("http://localhost:5000/product/remove-product?prod=" + id, {
                method: 'POST',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()
            window.location.reload(false)
        } catch (err) {
            console.error(err.message);
        }
    }

    async function edit(e) {
        e.preventDefault()
        try {
            setEditing(!isEditing)
        } catch (err) {
            console.error(err.message);
        }
    }

    /**
     * Form input management
     */
    const [inputs, setInputs] = useState({
        prod_descricao: nome,
        prod_preco: price,
        prod_quantidade: quantidade,
        prod_categoria: categoria,
        prod_categoria_id: id_categoria
    })// So you can store the value of the input

    const { prod_descricao, prod_preco, prod_quantidade, prod_categoria_id } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    /**
     * Edit form submit function
     */
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const descricao = prod_descricao
            const preco = prod_preco
            const quantidade = prod_quantidade
            const categoria_id = prod_categoria_id
            const body = { descricao, preco, quantidade, categoria_id}
            console.log(body)
            const response = await fetch("http://localhost:5000/product/update-product?prod=" + id, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json', token: localStorage.token },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()
            window.location.reload(false)
        } catch (err) {
            console.error(err.message);
            toast.error('🚫 Product Info Update Fail')
        }
    }
    

    function onCatChange(e){
        const elem = document.getElementById("categoriasSelect");
        console.log("O VALOR DA NOVA CATEGORIA");
        console.log(elem.value);
        setInputs({...inputs, prod_categoria_id: elem.value})
    }
    
    /*
    useEffect(()=>{
        getCategory(id)
    }, []);
    //*/


    // -------------------------RESGATAR IMAGEM DO PRODUTO--------------------------
    
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    
    
    const getImage = async (id) => {
        try {
            const res = await fetch("http://localhost:5000/product/get-product-image?id=" + id, {
                method: 'GET',
                headers: { token: localStorage.token }
            })

            if (res.status === 200 ) {
                const imageBlob = await res.blob()
                const imageObjectURL = URL.createObjectURL(imageBlob);
                
                setImage(imageBlob)
                setImagePath(imageObjectURL)
                
                /*
                const container = document.getElementById("your-container")
                container.append(image)
                //*/
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getImage(id)
    }, [])
    //<img src="https://via.placeholder.com/250" className="card-img-top" alt="Produto"></img>
            
    return (

        <div className="card" style={cardStyle}>

            {image !== null ? (
                <img src={imagePath} className="card-img-top" alt="Produto"></img>
            ): (
                <img src="https://via.placeholder.com/250" className="card-img-top" alt="Produto"></img>
            )}

            <div className="card-body">
                {!isEditing ? (
                    <Fragment>
                        <h5 className="card-title">{nome}</h5>
                        <p className="card-text"><strong>{categoria}</strong></p>
                        <p className="card-text"> R$ {price}</p>
                        <p className="card-text">{quantidade} itens em estoque</p>
                        
                        
                    </Fragment>
                ) : (
                    <form onSubmit={onSubmitForm}>
                        <input
                            type="text"
                            name="prod_descricao"
                            placeholder="descrição"
                            className="form-control my-3"
                            value={prod_descricao}
                            onChange={e => onChange(e)}
                        />

                        <select name="categorias" id="categoriasSelect" onChange={(e)=>{onCatChange(e)}}>
                            {
                                categorias.length > 0 &&
                                categorias.map((catego) => (
                                    <option key={catego.id} value={catego.id}>{catego.descricao}</option>
                                ))    
                            }
                        </select>
                        
                        <input
                            type="number"
                            name="prod_preco"
                            placeholder="preço"
                            className="form-control my-3"
                            value={prod_preco}
                            onChange={e => onChange(e)}
                        />
                        <input
                            type="number"
                            name="prod_quantidade"
                            placeholder="quantidade"
                            className="form-control my-3"
                            value={prod_quantidade}
                            onChange={e => onChange(e)}
                        />
                        

                        <div className="d-grid gap-2 my-3">
                            <button className="btn btn-primary btn-success">Submit</button>
                        </div>
                    </form>
                )}
                {isAdministrator ? (
                    <Fragment>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                                className="btn btn-primary"
                                onClick={e => edit(e)}
                            >Edit</button>
                            <button
                                className="btn btn-danger"
                                onClick={e => remove(e)}
                            >Remove</button>
                        </div>
                    </Fragment>
                ) : (
                    isAuthenticated ? (
                        <Fragment>
                            <button onClick={(e) =>  {add(e, {id: id, descricao: nome, preco: price, quantidade: 1})}} className="btn btn-primary"> Adicionar</button>
                        </Fragment>
                    ) : (
                        <Fragment></Fragment>
                    )
                    
                    
                )}


            </div>
        </div>

    )
}

export default ProductComponent