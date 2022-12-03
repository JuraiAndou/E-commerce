class Usuario{
    constructor(_id, _nome, _endereco, _email, _login, _senha, _administrador)
    {
        this._id = _id;
        this._nome = _nome;
        this._endereco = _endereco;
        this._email = _email;
        this._login = _login;
        this._senha = _senha;
        this._administrador = _administrador;
        
        
    }
    get id(){
        return this._id;
    }
    set id(new_id){
        this._id = new_id;
    }

    get nome(){
        return this._nome;
    }
    set nome(new_nome){
        this._nome = new_nome;
    }
    
    get endereco(){
        return this._endereco;
    }
    set endereco(new_endereco){
        this._endereco = new_endereco;
    }
    
    get email(){
        return this._email;
    }
    set email(new_email){
        this._email = new_email;
    }
    
    get login(){
        return this._login;
    }
    set login(new_login){
        this._login = new_login;
    }
    
    get senha(){
        return this._senha;
    }
    set senha(new_senha){
        this._senha = new_senha;
    }

    get administrador(){
        return this._administrador;
    }
    set administrador(new_adm){
        this._administrador = new_adm;
    }
}

module.exports = { Usuario };