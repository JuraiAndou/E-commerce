const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')
const fileUpload = require('express-fileupload');
const pcDAO = require('../modelo/produto_categoriaDAO')
const pDAO= require('../modelo/produtoDAO')
const path = require('path');
const { log } = require('console');



router.post('/add-product', authorization, priviledge, async (req, res) => {
    //console.log(req);
    try {
        const { descricao, preco, quantidade, categoria} = req.body
        //console.log("bingus");
        //console.log(req.body);
        /**
         * @TODO Change this to a user DAO
         */

        const imagem = req.files.imagem;


        const newProduct = await pool.query('INSERT INTO public.produto(descricao, preco, quantidade)VALUES ($1, $2, $3) RETURNING *', [
            descricao,
            parseFloat(preco),
            parseInt(quantidade),
        ])

        const newId = await newProduct.rows[0].id;

        const foto = await pool.query('UPDATE produto SET foto = $1 WHERE id = $2 RETURNING * ',[
            {imagem: newId},
            newId
        ])
        
        imagem.mv(`${__dirname}/../images/${newId}.png`, err => {
            if (err) {
                console.error(err.message);
                res.status(500).send(err)
            }
        })


        //console.log("bingus");
        //console.log(newId);
        //console.log(categoria);
        // Dar uma categoria ao produto
        const newProductCategory = await pcDAO.inserir(newId, categoria)
        //console.log(newProduct.rows);
        res.json(newProduct.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.get('/get-products',  async (req, res) => {
    try {
        //res.json(req.user)

        /**
         * @TODO Change this to a user DAO
         */
        const product = await pool.query('SELECT * FROM produto')
        
        res.json(product.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.get('/get-productsWithCategory', authorization, async(req, res) =>{
    try {
        //res.json(req.user)

        /**
         * @TODO Change this to a user DAO
         */
        //console.log("ENTROU NA URL");
        const product = await pcDAO.obterProdutosComCategoria()
        
        

        res.json(product)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/update-product', authorization, priviledge, async (req, res) => {
    try {
        
        const { descricao, preco, quantidade, categoria_id } = req.body

        const { prod } = req.query

        /**
         * @TODO Change this to a user DAO
         */
        const newProduct = await pool.query('UPDATE produto SET descricao = $1, preco = $2, quantidade = $3 WHERE id = $4', [
            descricao,
            preco,
            quantidade,
            prod
        ])

        const newCat = await pool.query('UPDATE produto_categoria SET id_categoria = $1  WHERE id_produto = $2',[
            categoria_id,
            prod
        ]);

        res.json(newProduct.rowCount)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/remove-product', authorization, priviledge, async (req, res) => {
    try {
        const { prod } = req.query

        /**
         * @TODO Change this to a user DAO
         */
        const remove_child = await pool.query('DELETE FROM public.venda_produto WHERE id_produto = $1; ', [
            prod
        ])
        const remove_parent = await pool.query('DELETE FROM public.produto WHERE id = $1; ', [
            prod
        ])
        res.json(remove_parent.rowCount)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.get('/obter-products-out', authorization, priviledge, async (req, res) => {

    try {
        result = await pDAO.obterOutEstoque()
        res.json(result)
    } catch (err) {
        console.error(err.message);
    }
      
})

router.get('/get-product-image', async (req, res) => {
    const id = req.query.id;
    let imagePath = "nada"
    imagePath = `${id}.png`
    
    try {
        let options = {
            root: path.join(`${__dirname}/../images/`)
        };

        res.sendFile(imagePath, options, (err) => {
            if(err){
                //console.error("FALA CAMBADAAAAAAAAAAA");
                console.error(err.message);
            }else{
                console.log("Enviando arquivo: ");
                console.log(imagePath);
            }
        })
        //console.log("--------------ALOW-------------------");
        //*/
    } catch (err) {
        //console.error(err.message);
        res.status(500).send("Sem imagem")
    }
    
    

    
    
    //*/


})

module.exports = router