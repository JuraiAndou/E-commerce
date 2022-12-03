class Venda_Produto{
    constructor(id_venda, id_produto, quantidade)
    {
        this._id_venda = id_venda;
        this._id_produto = id_produto;
        this._quantidade = quantidade;
        
    }

    get id_venda(){
        return this._id_venda;
    }
    set id_venda(new_id_venda){
        this._id_venda = new_id_venda;
    }

    get id_produto(){
        return this._id_produto;
    }
    set id_produto(new_id_produto){
        this._id_produto = new_id_produto;
    }

    get quantidade(){
        return this._quantidade;
    }
    set quantidade(new_quantidade){
        this._quantidade = new_quantidade;
    }

}