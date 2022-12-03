class Categoria{
    constructor(id, descricao)
    {
        this._id = id;
        this._descricao = descricao;
        
    }

    get id(){
        return this._id;
    }
    set id(newId){
        this._id = newId;
    }

    get descricao(){
        return this._descricao;
    }
    set descricao(newDescricao){
        this._descricao = newDescricao;
    }

}