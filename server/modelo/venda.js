class Venda{
    constructor(id, data, id_usuario)
    {
        this._id = id;
        this._data = data;
        this._id_usuario = id_usuario
        
    }

    get id(){
        return this._id;
    }
    set id(new_id){
        this._id = new_id;
    }

    get data(){
        return this._data;
    }
    set data(new_data){
        this._data = new_data;
    }

    get id_usuario(){
        return this._id_usuario;
    }
    set id_usuario(new_id_usuario){
        this._id_usuario = new_id_usuario;
    }


}