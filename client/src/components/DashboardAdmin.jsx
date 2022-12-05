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
        localStorage.removeItem('carrinho')
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

        setPoductData({ ...productData, categoria: elem.value });
    }

    //------------Relatorio de cada cliente-------------
    const [cliente, setCliente] = useState([])

    async function getCliente() {// Recuperar as categorias do Banco de Dados
        try {
            const response = await fetch("http://localhost:5000/dashboard/get-all-users", {
                method: 'GET',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()
            setCliente(parseRes)


        } catch (err) {
            console.error(err.message);
        }
    }

    const [clienteCompras, setClienteCompras] = useState([])

    async function getClienteCompras(userSelected) {
        const user = userSelected
        try {
            const response = await fetch("http://localhost:5000/sales/get-vendas-user", {
                method: 'GET',
                headers: { token: localStorage.token, user: user }

            })

            const parseRes = await response.json()
            setClienteCompras(parseRes)
           
        } catch (err) {
            console.error(err.message);
        }
    }

    function onClienteChange(e) {
        const elem = document.getElementById("clientSelect");
        let valor = elem.value
        getClienteCompras(valor)
        
    }

    function showClientSales (){       
        return clienteCompras.map((ind) => {
            return (
                <Fragment>
                    <tr key={ind.id} style={table_style}>
                    <td style={table_style}><button className="btn btn-danger" onClick={e => { onRemoveSale(e, ind.id)}} >   X  </button>   {ind.id}</td>
                    <td style={table_style}>R${ind.preco_final}</td>
                    <td style={table_style}>{ind.data} </td>
                   </tr>
                </Fragment>   
            )
        })
    }
    //----------Exclusão de compra cliente-----------
    async function onRemoveSale(e,id_venda){
        try {
            const response = await fetch("http://localhost:5000/sales/remove-venda-client?prod=" + id_venda,{
                method: 'POST',
                headers: { token: localStorage.token },
            })
            const parseRes = await response.json()
            window.location.reload(false)

        } catch (err) {
            console.error(err.message);
        }
    }


    //---------------Relatorio----------------
    const [Relatorio, setRelatorio] = useState([])

    async function getRelatorio() {
        try {
            const result = await fetch("http://localhost:5000/sales/get-allUser-sales?" + new URLSearchParams({
                date_int: '2022-09-10',
                date_fnl: '2022-12-06'
            }), {
                method: 'GET',
                headers: { token: localStorage.token }
            })
            const parseRes = await result.json()

            parseRes.sort((a, b) => b[2] - a[2]);

            setRelatorio(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    function showRelatorio() {
        return Relatorio.map((rel) => {
            return (
                <tr key={rel[0]} style={table_style}>
                    <td style={table_style}>{rel[1]}</td> 
                    <td style={table_style}>{rel[0]}</td>
                    <td style={table_style}>{rel[2]}</td>
                </tr>
            )

        })

    }
    //---------------Relatorio Produto----------------
    const [RelatorioP, setRelatorioP] = useState([])

    async function getRelatorioProdutos() {

        try {

            const result = await fetch("http://localhost:5000/product/obter-products-out", {
                method: 'GET',
                headers: { token: localStorage.token }
            })



            const parseRes = await result.json()
            parseRes.sort((a, b) => b[0] - a[0]);


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
                    <td style={table_style}>{rel[0]}</td>
                    <td style={table_style}>{rel[2]}</td>
                </tr>
            )

        })
    }

    let table_style = {
        border: '1px solid black'
    }

    //---------------Relatorio Vendas por Dias----------------

    const [RelatorioVendas, setRelatorioVendas] = useState([])

    async function getRelatorioVendas() {
        try {
            const result = await fetch("http://localhost:5000/sales/get-vendas-per-day?" + new URLSearchParams({
                date_int: '2022-02-01',
                date_fnl: '2022-12-03'
            }), {
                method: 'GET',
                headers: { token: localStorage.token }
            })
            
            const parseRes = await result.json()
            setRelatorioVendas(parseRes)
        } catch (err) {
            toast.error('Fail to generate sales report')
            console.error(err.stack)
        }
    }

    function showRelatorioVendas() {
        return RelatorioVendas.map((rel, i) => {
            console.log(rel)
            return (
                <tr key={i} style={table_style}>
                    <td style={table_style}>{rel[0]}</td>
                    <td style={table_style}>{rel[1]}</td>
                </tr>
            )
        })
    }


    // Atualizar a cada renderização -----------------
    useEffect(() => {// Called everytime the component is rendered
        getName();
        getCategorias();
        getRelatorio();
        getRelatorioProdutos();
        getCliente()
        getRelatorioVendas()
    }, [])
    // -----------------------------------------------


    //<br/><input type="text" name="categoria" placeholder="Categoria" value={productData.categoria} onChange={e=>{onChangeProduct(e)}}/><br/>
    return (
        <Fragment>
            <br/>
            <p>Hello <strong>{name.split(' ')[0]}</strong></p>

            Adicionar novo produto:
            <form onSubmit={onSubmitProduct}>
                Descrição: <br /><input type="text" name="descricao" placeholder="Descrição" value={productData.descricao} onChange={e => { onChangeProduct(e) }} /><br />
                Preço: <br /><input type="text" name="preco" placeholder="Preço" value={productData.preco} onChange={e => { onChangeProduct(e) }} /><br />
                Quantidade: <br /><input type="text" name="quantidade" placeholder="Quantidade" value={productData.quantidade} onChange={e => { onChangeProduct(e) }} /><br />
                Categoria: <br /><select id="catSelect" onChange={e => { onCatChange(e) }} name="categoria">
                    <option value="---" disabled selected hidden>Selecione a categoria</option>
                    
                    {
                        categoria.length > 0 &&
                        categoria.map((catego) => (
                            <option key={catego.id} value={catego.id}>{catego.descricao}</option>
                        ))
                    }
                </select>
                <br/>
                <input type="submit" className="btn btn-primary"/>
            </form>
            <br />

            Adicionar nova categoria:
            <form onSubmit={onSubmitCategory}>
                <input type="text" name="descricao" placeholder="Descrição" value={categoryData.descricao} onChange={e => { onChangeCategory(e) }} /><br />
                <input type="submit" className="btn btn-primary"/>
            </form>
            <br />
            <br />

            <h3><strong>Compras feitas por cliente:</strong></h3>
            Cliente: <select id="clientSelect" name="cliente" onChange={e => { onClienteChange(e) }} className="form-select" aria-label="Default select example">
            <option value="---" disabled selected hidden >Selecione um cliente</option>                {
                    cliente.length > 0 &&
                    cliente.map((client) => (
                        <option key={client.user_id} value={client.user_id}>{client.user_email}</option>
                    ))
                }
            </select>
            <br/>
            <Fragment>
                <table width="400" cellPadding="5"
                    style={table_style} className="table table-dark table-striped-columns">
                    <thead>
                        <tr style={table_style}>
                            <th style={table_style}>ID DA VENDA</th>
                            <th style={table_style}>PREÇO</th>
                            <th style={table_style}>DATA</th>
                        </tr>
                        {showClientSales()}
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </Fragment>

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
            <br />
            <Fragment>
                <h5>Produtos fora de estoque</h5>
                <table width="400" cellPadding="5"
                    style={table_style}>
                    <thead>
                        <tr style={table_style}>
                            <th style={table_style}>PRODUTO</th>
                            <th style={table_style}>ID PRODUTO</th>
                            <th style={table_style}>PREÇO (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showRelatorioP()}
                    </tbody>
                </table>
            </Fragment>
            <br />
            <Fragment>
                <h5>Produtos fora de estoque</h5>
                <table width="400" cellPadding="5"
                    style={table_style}>
                    <thead>
                        <tr style={table_style}>
                            <th style={table_style}>DATA</th>
                            <th style={table_style}>VALOR (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showRelatorioVendas()}
                    </tbody>
                </table>
            </Fragment>
            <br />
            <Fragment>
                <div className="btnDiv">
                    <button id="downloadBtn" value="download" onClick={() => {
                        let text = []
                        text.push(`\t-----[Compras Feitas por Cliente]-----\n`)
                        for (let i = 0; i < Relatorio.length; i++) {
                            const rel = Relatorio[i];
                            text.push(`|id:`,rel[0], '|\t')
                            text.push(`|nome:`,rel[1], '|\t')
                            text.push(`|quantidade de compras:`,rel[2], '|\n')
                        }

                        text.push(`\n\n\t-----[Produtos Fora de Estoque]-----\n`)
                        for (let i = 0; i < RelatorioP.length; i++) {
                            const rel = RelatorioP[i];
                            text.push(`|id:`,rel[0], '|\t')
                            text.push(`|Descrição:`,rel[1], '|\t')
                            text.push(`|Preço:R$`,rel[2], '|\n')
                        }

                        const file = new Blob(text, { type: 'text/plain' })

                        const element = document.createElement("a")
                        element.href = URL.createObjectURL(file)
                        element.download = "Relatório" + Date.now() + ".txt"

                        document.body.appendChild(element)
                        element.click()
                    }} className="btn btn-secondary">Download</button>
                </div>
            </Fragment>
            <br />
            <Link to="/edit" className="btn">Edit Profile</Link>
            <button
                className="btn btn-primary"
                onClick={e => logout(e)}
            >Logout</button>
        </Fragment>


    )
}

export default DashbordAdmin
