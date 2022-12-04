class Venda{
    constructor(id, data_hora, id_usuario)
    {
        this._id = id;
        this._data_hora = data_hora;
        this._id_usuario = id_usuario
        this
        
    }

    get id(){
        return this._id;
    }
    set id(new_id){
        this._id = new_id;
    }

    get data_hora(){
        return this._data_hora;
    }
    set data_hora(new_data_hora){
        this._data_hora = new_data_hora;
    }

    get id_usuario(){
        return this._id_usuario;
    }
    set id_usuario(new_id_usuario){
        this._id_usuario = new_id_usuario;
    }


}