import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';




const DashbordAdmin = (props) => {

    const [name, setName] = useState("")

    async function getName() {// Gets the user name from the dashboard Server Route
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: 'GET',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()

            setName(parseRes.user_name)
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault()// Prevents a refresh
        localStorage.removeItem('token')
        props.setAuth(false)
        toast.success("Logged out successfully")
    }

    // Atualizar a cada renderização -----------------
    useEffect(() => {// Called everytime the component is rendered
        getName();
        getCategorias();
    }, [])
    // -----------------------------------------------

    const [productData, setPoductData] = useState({
        descricao: "",
        preco: 0,
        quantidade: 0,
        categoria: ""
    });

    const onChangeProduct = (e)=>{
        setPoductData({...productData, [e.target.name]: e.target.value})
    }

    const onSubmitProduct = async(e) =>{
        e.preventDefault();
        try {//console.log(productData);
        const body = productData;
        console.log(body);

        const response = await fetch('http://localhost:5000/product/add-product', {
                method: 'POST',
                headers: { token: localStorage.token, 
                           'Content-Type': 'application/json' 
                         },
                body: JSON.stringify(body)
            })
        const parseRes = await response.json()
        toast.success('Product ' + productData.descricao + ' added')
            
        console.log(parseRes);
        }catch(err){
            console.error(err.message);
        }
    }

    const [categoryData, setCategoryData] = useState({
        descricao: "",
    });

    const onChangeCategory = (e)=>{
        setCategoryData({...categoryData, [e.target.name]: e.target.value})
    }

    const onSubmitCategory = async(e) =>{
        e.preventDefault();
        try {//console.log(productData);
          const body = categoryData;
          console.log(body);
          if (categoryData.descricao !== '') {
            const response = await fetch('http://localhost:5000/category/add-category', {
              method: 'POST',
                headers: { token: localStorage.token, 
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify(body)
              })
            const parseRes = await response.json()
            toast.success('Category ' + categoryData.descricao + ' added')
            
            console.log(parseRes);
          } else{
            toast.error('Product description empty')
          }
        }catch(err){
            console.error(err.message);
        }
    }

    //---------------Categorias-----------------
    
    const [categoria, setCategoria] = useState([]) 

    async function getCategorias() {// Recuperar as categorias do Banco de Dados
        try {
            const response = await fetch("http://localhost:5000/category/get-categories", {
                method: 'GET',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()
            //console.log(parseRes[0].descricao);
            setCategoria(parseRes)
            
        } catch (err) {
            console.error(err.message);
        }
    }

    function onCatChange(e){
        const elem = document.getElementById("catSelect");
        let value = elem.value
        //let text = elem.options[]
        setPoductData({...productData, categoria: elem.value});
        //console.log("Id da categoria: " + value);
    }

    //<br/><input type="text" name="categoria" placeholder="Categoria" value={productData.categoria} onChange={e=>{onChangeProduct(e)}}/><br/>
    return (
        <Fragment>
            <h1>Dashboard Admin</h1>
            <p>Hello <strong>{name.split(' ')[0]}</strong></p>
            
            Adicionar novo produto: 
            <form onSubmit={onSubmitProduct}>
                Descrição: <br/><input type="text" name="descricao" placeholder="Descrição" value={productData.descricao} onChange={e=>{onChangeProduct(e)}}/><br/>
                Preço: <br/><input type="text" name="preco" placeholder="Preço" value={productData.preco} onChange={e=>{onChangeProduct(e)}}/><br/>
                Quantidade: <br/><input type="text" name="quantidade" placeholder="Quantidade" value={productData.quantidade} onChange={e=>{onChangeProduct(e)}}/><br/>
                Categoria: <br/><select id="catSelect" onChange={e => {onCatChange(e)}} name="categoria">
                    {
                        categoria.length > 0 &&
                        categoria.map((catego) =>(
                            <option key={catego.id} value={catego.id}>{catego.descricao}</option>
                        ))
                    }
                </select>
                <input type="submit"/>
            </form>
            <br/>
            
            Adicionar nova categoria: 
            <form onSubmit={onSubmitCategory}>
                <input type="text" name="descricao" placeholder="Descrição" value={categoryData.descricao} onChange={e=>{onChangeCategory(e)}}/><br/>
                <input type="submit"/>
            </form>

            <Link to="/edit" className="btn">Edit Profile</Link>
            <button
                className="btn btn-primary"
                onClick={e => logout(e)}
            >Logout</button>
        </Fragment>
    )
}

export default DashbordAdmin
