const router = require('express').Router()
const pool = require('../dbConfig')
const authorization = require('../middleware/authorization')
const priviledge = require('../middleware/isAdmin')
const cDAO = require('../modelo/categoriaDAO');
const pcDAO = require('../modelo/produto_categoriaDAO');

router.post('/add-category', authorization, priviledge, async (req, res) => {
    try {
        const { descricao } = req.body

        /**
         * @TODO Change this to a user DAO
         */
        /*
        const newCategory = await pool.query('INSERT INTO public.categoria(descricao)VALUES ($1) RETURNING *', [
            descricao,
        ])
        //*/
        const newCategory = await cDAO.inserir(descricao);

        res.json(newCategory.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.get('/get-categories', authorization, priviledge, async (req, res) => {
    try {
        /**
         * @TODO Change this to a user DAO
         */
        //const category = await pool.query('SELECT * FROM categoria')
        
        //res.json(category.rows)
        const category = await cDAO.obterTodos()
        
        //console.log("bingus: ");
        //console.log(category);

        res.json(category)

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/get-category', async (req, res) => {
    try {
        /**
         * @TODO Change this to a user DAO
         */
        //const category = await pool.query('SELECT * FROM categoria')
        
        //res.json(category.rows)
        const {id_produto} = req.body;

        const categories = await pcDAO.obterCategoriasDoProduto(id_produto)
        console.log(categories[0]);
        //const category = await cDAO.obter(categories[0].id);
        
        //console.log("bingus: ");
        //console.log(category);

        res.json(categories[0])

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/get-category-products', async (req, res) => {
    // Pega a categoria de um produto a partir do seu id
    try {
        const {id_produto} = req.query;

        const category = await pcDAO.obterCategoriasDoProduto(id_produto)
        //console.log(categories[0]);
        
        res.json(category)

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/get-products-category', async (req, res) => {
    // Pega os produtos de uma categoria a partir de seu id
    try {
        //console.log("abubl??");
        const {id_categoria} = req.query;
        //console.log(req.query);
        const products = await pcDAO.obterProdutosDaCategoria(id_categoria)
        //console.log(categories[0]);
        
        res.json(products)

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})


router.post('/update-category', authorization, priviledge, async (req, res) => {
    try {
        
        const { descricao } = req.body

        const { cat } = req.query
        /**
         * @TODO Change this to a user DAO
         */
        /*
        const newCategory = await pool.query('UPDATE categoria SET descricao = $1 WHERE id = $2 RETURNING *', [
            descricao,
            cat
        ])
        */

        const newCategory = await cDAO.atualizar(descricao, cat);

        res.json(newCategory.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

router.post('/remove-category', authorization, priviledge, async (req, res) => {
    try {
        const { cat } = req.query

        /**
         * @TODO Change this to a user DAO
         */
        /*
        const oldCategory = await pool.query('DELETE FROM public.categoria WHERE id = $1;', [
            cat
        ])
        //*/
        await pcDAO.deletarPelaCategoria(cat);
        const oldCategory = await cDAO.deletar(cat);

        res.json(oldCategory.rowCount)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

module.exports = router