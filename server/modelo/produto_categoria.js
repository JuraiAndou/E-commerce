class Produto_Categoria{
    constructor(id_produto, id_categoria)
    {
        this._id_produto = id_produto;
        this._id_categoria = id_categoria;
        
    }

    get id_produto(){
        return this._id_produto;
    }
    set id_produto(new_id_produto){
        this._id_produto = new_id_produto;
    }

    get id_categoria(){
        return this._id_categoria;
    }
    set id_categoria(new_id_categoria){
        this._id_categoria = new_id_categoria;
    }

}