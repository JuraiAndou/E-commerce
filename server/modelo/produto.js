class Produto{
    constructor(id, descricao, preco, foto, quantidade)
    {
        this._id = id;
        this._descricao = descricao;
        this._preco = preco;
        this._foto = foto;
        this._quantidade = quantidade;
        
    }

    get id(){
        return this._id;
    }
    set id(new_id){
        this._id = new_id;
    }

    get descricao(){
        return this._descricao;
    }
    set descricao(new_descricao){
        this._descricao = new_descricao;
    }

    get preco(){
        return this._preco;
    }
    set preco(new_preco){
        this._preco = new_preco;
    }

    get foto(){
        return this._foto;
    }
    set foto(new_foto){
        this._foto = new_foto;
    }

    get quantidade(){
        return this._quantidade;
    }
    set quantidade(new_quantidade){
        this._quantidade = new_quantidade;
    }
}