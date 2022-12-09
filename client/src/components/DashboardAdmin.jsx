import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import moment from 'moment'
import axios from 'axios'


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
        categoria: "",
    });

    const onChangeProduct = (e) => {
        setPoductData({ ...productData, [e.target.name]: e.target.value })
    }

    const [imagem, setImagem] = useState();
    
    const onChangeImage = (e) => {
        setImagem(e.target.files[0]);
    }

    const onSubmitProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (var key in productData){
            formData.append(key, productData[key]);
        }

        formData.append('imagem', imagem)

        try {//console.log(productData);
            const body = productData;
            console.log(body);

            /*
            const response = await fetch('http://localhost:5000/product/add-product', {
                method: 'POST',
                headers: {
                    token: localStorage.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            //*/
            const response = await axios.post('http://localhost:5000/product/add-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.token
                }
            })


            //const parseRes = await response.json()
            toast.success('Product ' + productData.descricao + ' added')

            //console.log(parseRes);
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

    function showClientSales() {
        return clienteCompras.map((ind) => {
            return (
                <Fragment>
                    <tr key={ind.id} style={table_style}>
                        <td style={table_style}><button className="btn btn-danger" onClick={e => { onRemoveSale(e, ind.id) }} >   X  </button>   {ind.id}</td>
                        <td style={table_style}>R${ind.preco_final}</td>
                        <td style={table_style}>{ind.data} </td>
                    </tr>
                </Fragment>
            )
        })
    }
    //----------Exclusão de compra cliente-----------
    async function onRemoveSale(e, id_venda) {
        try {
            const response = await fetch("http://localhost:5000/sales/remove-venda-client?prod=" + id_venda, {
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
    const [CPCInitialDate, setCPCInitialDate] = useState([])
    const [CPCFinalDate, setCPCFinalDate] = useState([])

    async function getRelatorio() {
        console.log('data init:', VInintialDate, '\ndate final:', VFinalDate)
        try {
            const result = await fetch("http://localhost:5000/sales/get-allUser-sales?" + new URLSearchParams({
                date_int: CPCInitialDate,
                date_fnl: CPCFinalDate
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

    function onChageCPCInitialDate(e) {
        let someDate = new Date(e.target.value)
        someDate.setDate(someDate.getDate() + 1)
        const newDate = moment(someDate).format('YYYY-MM-DD')
        setCPCInitialDate(newDate)

        getRelatorioVendas()
    }

    function onChageCPCFinalDate(e) {
        let someDate = new Date(e.target.value)
        someDate.setDate(someDate.getDate() + 1)
        const newDate = moment(someDate).format('YYYY-MM-DD')
        console.log(e.target.value);
        setCPCFinalDate(newDate)

        getRelatorioVendas()
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
    const [VInintialDate, setVInitialDate] = useState([])
    const [VFinalDate, setVFinalDate] = useState([])

    async function getRelatorioVendas() {
        console.log('data init:', VInintialDate, '\ndate final:', VFinalDate)
        try {
            const result = await fetch("http://localhost:5000/sales/get-vendas-per-day?" + new URLSearchParams({
                date_int: VInintialDate,
                date_fnl: VFinalDate
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
            return (
                <tr key={i} style={table_style}>
                    <td style={table_style}>{rel[0]}</td>
                    <td style={table_style}>{rel[1]}</td>
                </tr>
            )
        })
    }

    function onChageVInitialDate(e) {
        let someDate = new Date(e.target.value)
        someDate.setDate(someDate.getDate() + 1)
        const newDate = moment(someDate).format('YYYY-MM-DD')
        setVInitialDate(newDate)

        getRelatorioVendas()
    }

    function onChageVFinalDate(e) {
        let someDate = new Date(e.target.value)
        someDate.setDate(someDate.getDate() + 1)
        const newDate = moment(someDate).format('YYYY-MM-DD')
        console.log(e.target.value);
        setVFinalDate(newDate)

        getRelatorioVendas()
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

    useEffect(() => {
        getRelatorioVendas();
    }, [VInintialDate, VFinalDate])

    useEffect(() => {
        getRelatorio();
    }, [CPCInitialDate, CPCFinalDate])

    //<br/><input type="text" name="categoria" placeholder="Categoria" value={productData.categoria} onChange={e=>{onChangeProduct(e)}}/><br/>
    return (
        <Fragment>
            <br />
            <p>Hello <strong>{name.split(' ')[0]}</strong></p>

            <h3> <strong>Adicionar novo produto: </strong></h3>
            <form onSubmit={onSubmitProduct} className="mb-3">
                Descrição:<input className="form-control"  type="text" name="descricao" placeholder="Descrição" value={productData.descricao} onChange={e => { onChangeProduct(e) }} />
                Preço: <input className="form-control"  type="text" name="preco" placeholder="Preço" value={productData.preco} onChange={e => { onChangeProduct(e) }} />
                Quantidade: <input className="form-control" type="text" name="quantidade" placeholder="Quantidade" value={productData.quantidade} onChange={e => { onChangeProduct(e) }} />
                Categoria: <select  className="form-select" aria-label="Default select example" id="catSelect" onChange={e => { onCatChange(e) }} name="categoria">
                    <option value="---" disabled selected hidden>Selecione a categoria</option>

                    {
                        categoria.length > 0 &&
                        categoria.map((catego) => (
                            <option key={catego.id} value={catego.id}>{catego.descricao}</option>
                        ))
                    }
                </select>
    
                Foto: <br /> <input class="form-control" type="file" name="imagem" placeholder="Imagem" accept=".png, .jpeg, .jpg" onChange={e => { onChangeImage(e) }} /><br />
                
                <input type="submit" className="btn btn-primary" />
            </form>
            <br />

            <h3><strong>Adicionar nova categoria:</strong></h3>
            <form onSubmit={onSubmitCategory}>
                <input  className="form-control" type="text" name="descricao" placeholder="Descrição" value={categoryData.descricao} onChange={e => { onChangeCategory(e) }} /><br />
                <input type="submit" className="btn btn-primary" />
            </form>
            <br />
            <br />

            <h3><strong>Vendas por cliente:</strong></h3>
            Cliente: <select id="clientSelect" name="cliente" onChange={e => { onClienteChange(e) }} className="form-select" aria-label="Default select example">
                <option value="---" disabled selected hidden >Selecione um cliente</option>                {
                    cliente.length > 0 &&
                    cliente.map((client) => (
                        <option key={client.user_id} value={client.user_id}>{client.user_email}</option>
                    ))
                }
            </select>
            <br />
            <Fragment>
                <table width="400" cellPadding="5"
                    style={table_style} className="table table-dark table-striped-columns  rounded">
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
                <h5>Total de Compras por cliente</h5>
                <h5>Vendas por dia</h5>
                data inicial: <input id="data-init" type='date' value={CPCInitialDate} onChange={e => { onChageCPCInitialDate(e) }} />
                data final: <input id="data-final" type="date" value={CPCFinalDate} onChange={e => { onChageCPCFinalDate(e) }} />
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
                <h5>Vendas por dia</h5>
                data inicial: <input id="data-init" type='date' value={VInintialDate} onChange={e => { onChageVInitialDate(e) }} />
                data final: <input id="data-final" type="date" value={VFinalDate} onChange={e => { onChageVFinalDate(e) }} />
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

            {/* Download Relatório */}
            <Fragment>
                <div className="btnDiv">
                    <button id="downloadBtn" value="download" onClick={() => {
                        let text = []
                        text.push(`\t-----[Compras Feitas por Cliente]-----\n`)
                        for (let i = 0; i < Relatorio.length; i++) {
                            const rel = Relatorio[i];
                            text.push(`|id:`, rel[0], '|\t')
                            text.push(`|nome:`, rel[1], '|\t')
                            text.push(`|quantidade de compras:`, rel[2], '|\n')
                        }

                        text.push(`\n\n\t-----[Produtos Fora de Estoque]-----\n`)
                        for (let i = 0; i < RelatorioP.length; i++) {
                            const rel = RelatorioP[i];
                            text.push(`|id:`, rel[0], '|\t')
                            text.push(`|Descrição:`, rel[1], '|\t')
                            text.push(`|Preço:R$`, rel[2], '|\n')
                        }

                        text.push(`\n\n\t-----[Vendas por dia]-----\n`)
                        for (let i = 0; i < RelatorioVendas.length; i++) {
                            const rel = RelatorioVendas[i];
                            text.push(`|Data:`, rel[0], '|\t')
                            text.push(`|Valor:R$`, rel[1], '|\n')
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
