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

    useEffect(() => {// Called everytime the component is rendered
        getName()
    }, [])

    const [productData, setPoductData] = useState({
        descricao: "",
        preco: 0,
        quantidade: 0
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

    return (
        <Fragment>
            <h1>Dashboard Admin</h1>
            <p>Hello <strong>{name.split(' ')[0]}</strong></p>
            
            Adicionar novo produto: 
            <form onSubmit={onSubmitProduct}>
                <input type="text" name="descricao" placeholder="Descrição" value={productData.descricao} onChange={e=>{onChangeProduct(e)}}/><br/>
                <input type="text" name="preco" placeholder="Preço" value={productData.preco} onChange={e=>{onChangeProduct(e)}}/><br/>
                <input type="text" name="quantidade" placeholder="Quantidade" value={productData.quantidade} onChange={e=>{onChangeProduct(e)}}/><br/>
                <input type="submit"/>
            </form>
            
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
