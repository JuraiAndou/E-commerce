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

    const [productData, setPoductData] = useState({
        descricao: "",
        preco: 0,
        quantidade: 0,
        categoria: ""
    });

    const onChangeProduct = (e) => {
        setPoductData({ ...productData, [e.target.name]: e.target.value })
    }

    const onSubmitProduct = async (e) => {
        e.preventDefault();
        try {//console.log(productData);
            const body = productData;
            console.log(body);

            const response = await fetch('http://localhost:5000/product/add-product', {
                method: 'POST',
                headers: {
                    token: localStorage.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const parseRes = await response.json()
            toast.success('Product ' + productData.descricao + ' added')

            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    const [categoryData, setCategoryData] = useState({
        descricao: "",
    });

    const onChangeCategory = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value })
    }

    const onSubmitCategory = async (e) => {
        e.preventDefault();
        try {//console.log(productData);
            const body = categoryData;
            console.log(body);
            if (categoryData.descricao !== '') {
                const response = await fetch('http://localhost:5000/category/add-category', {
                    method: 'POST',
                    headers: {
                        token: localStorage.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                const parseRes = await response.json()
                toast.success('Category ' + categoryData.descricao + ' added')

                console.log(parseRes);
            } else {
                toast.error('Product description empty')
            }
        } catch (err) {
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

    function onCatChange(e) {
        const elem = document.getElementById("catSelect");
        let value = elem.value
        //let text = elem.options[]
        setPoductData({ ...productData, categoria: elem.value });
        //console.log("Id da categoria: " + value);
    }

    //---------------Relatorio----------------

    const [Relatorio, setRelatorio] = useState([])

    async function getRelatorio() {
        try {
            const result = await fetch("http://localhost:5000/sales/get-allUser-sales", {
                method: 'GET',
                headers: { token: localStorage.token }
            })
            const parseRes = await result.json()

            parseRes.sort((a, b) => b[2] - a[2]);

            setRelatorio(parseRes);
            console.log(parseRes);

        } catch (err) {
            console.error(err.message);
        }
    }

    function showRelatorio() {
        return Relatorio.map((rel) => {
            return (
                <tr key={rel[0]} style={table_style}>
                    <td style={table_style}>{rel[1]}</td>
                    <td  style={table_style}>{rel[0]}</td>
                    <td  style={table_style}>{rel[2]}</td>
                </tr>
            )

        })

    }
    //---------------Relatorio----------------
    const [RelatorioP, setRelatorioP] = useState([])

    async function getRelatorioProdutos(){
    
        try {

            const result = await fetch("http://localhost:5000/product/obter-products-out", {
                method: 'GET',
                headers: { token: localStorage.token }
            })

      
            console.log(result);
            const parseRes = await result.json()
            console.log("oi");

            console.log(parseRes);
            setRelatorioP(parseRes);;

        } catch (err) {
            console.error(err.message);
        }
    }

    function showRelatorioP() {
       
        return RelatorioP.map((rel) => {
            return (
                <tr key={rel[0]} style={table_style}>
                    <td style={table_style}>{rel[1]}</td>
                    <td  style={table_style}>{rel[0]}</td>
                    <td  style={table_style}>{rel[2]}</td>
                </tr>
            )

        })
    }



    let table_style = {
        border: '1px solid black'
    }

    // Atualizar a cada renderização -----------------
    useEffect(() => {// Called everytime the component is rendered
        getName();
        getCategorias();
        getRelatorio();
        getRelatorioProdutos();

    }, [])
    // -----------------------------------------------


    //<br/><input type="text" name="categoria" placeholder="Categoria" value={productData.categoria} onChange={e=>{onChangeProduct(e)}}/><br/>
    return (
        <Fragment>
            <h1>Dashboard Admin</h1>
            <p>Hello <strong>{name.split(' ')[0]}</strong></p>

            Adicionar novo produto:
            <form onSubmit={onSubmitProduct}>
                Descrição: <br /><input type="text" name="descricao" placeholder="Descrição" value={productData.descricao} onChange={e => { onChangeProduct(e) }} /><br />
                Preço: <br /><input type="text" name="preco" placeholder="Preço" value={productData.preco} onChange={e => { onChangeProduct(e) }} /><br />
                Quantidade: <br /><input type="text" name="quantidade" placeholder="Quantidade" value={productData.quantidade} onChange={e => { onChangeProduct(e) }} /><br />
                Categoria: <br /><select id="catSelect" onChange={e => { onCatChange(e) }} name="categoria">
                    {
                        categoria.length > 0 &&
                        categoria.map((catego) => (
                            <option key={catego.id} value={catego.id}>{catego.descricao}</option>
                        ))
                    }
                </select>
                <input type="submit" />
            </form>
            <br />

            Adicionar nova categoria:
            <form onSubmit={onSubmitCategory}>
                <input type="text" name="descricao" placeholder="Descrição" value={categoryData.descricao} onChange={e => { onChangeCategory(e) }} /><br />
                <input type="submit" />
            </form>
            <br />
            <br />

            <h2 > <strong>Relatório</strong></h2>
            <Fragment>
            <h5>Compras feitas por cliente</h5>
                <table width="400" cellPadding="5"
                    style={table_style}>
                    <thead>
                        <tr style={table_style}>
                            <th style={table_style}>CLIENTE</th>
                            <th style={table_style}>ID USUARIO</th>
                            <th style={table_style}>QUANT. DE COMPRAS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showRelatorio()}
                    </tbody>
                </table>
            </Fragment>
            <br/>
            <Fragment>
            <h5>Produtos fora de estoque</h5>
            <table width="400" cellPadding="5"
                    style={table_style}>
                    <thead>
                        <tr style={table_style}>
                            <th style={table_style}>PRODUTO</th>
                            <th style={table_style}>ID PRODUTO</th>
                            <th style={table_style}>PREÇO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showRelatorioP()}
                    </tbody>
                </table>
            </Fragment>

            <Link to="/edit" className="btn">Edit Profile</Link>
            <button
                className="btn btn-primary"
                onClick={e => logout(e)}
            >Logout</button>
        </Fragment>
        
        
    )
}

export default DashbordAdmin
