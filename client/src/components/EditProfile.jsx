import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const EditProfile = (props) =>{

    const [data, setData] = useState({
        user_name: "",
        user_email: "",
        user_adress: "",
        user_password: ""
    });

    // Retrive data from user
    async function getData(){
        try{
            const response = await fetch("http://localhost:5000/dashboard/data", {
                method: 'GET',
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()
            setData(parseRes)
            
        } catch(err){
            console.error(err.message);
        }
    }

    const [newData, setNewData] = useState({
        user_name: "",
        user_email: "",
        user_adress: "",
        user_password: ""
    });

    const onEdit = (e) =>{
        setNewData({ ...newData, [e.target.name]: e.target.value });
        //console.log(newData);
    }
    
    async function setDataBD(){
        try{
            const body = newData; 
            const response = await fetch("http://localhost:5000/dashboard/update", {
                method: 'POST',
                headers: { token: localStorage.token, 
                           'Content-Type': 'application/json'
                         },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()
            setData(parseRes)
            
            //console.log(newData);
            //console.log(parseRes);
            
        }catch(err){
            console.error(err.message);
        }
    }

    const onSubmitEdit = async (e) => {
        e.preventDefault()
        setDataBD();
    }
    
    const deleteUser = async(e) => {
        //e.preventDefault()// Prevents a refresh
        try{
            await fetch("http://localhost:5000/dashboard/deleteUser", {
                method: "POST",
                headers: { token: localStorage.token, 
                    'Content-Type': 'application/json'
                  }
            })
            localStorage.removeItem('token')
            window.location.reload(false);
        } catch(err){
            console.error(err.message);
        }
    }

    useEffect(() => {// Called everytime the component is rendered
        getData()
    }, [])
    
    return(
        <Fragment>
            <h1>Edit Profile</h1>
            <p>{data.user_name}</p>
            <p>{data.user_email}</p>
            <p>{data.user_adress}</p>
            
            <form onSubmit={onSubmitEdit}>
                <input type="text" name="user_name" placeholder="Name" value={newData.user_name} onChange={e => onEdit(e)} />
                <input type="email" name="user_email" placeholder="Email" value={newData.user_email} onChange={e => onEdit(e)} />
                <input type="text" name="user_adress" placeholder="Address" value={newData.user_adress} onChange={e => onEdit(e)} />
                <input type="password" name="user_password" placeholder="Password" value={newData.user_password} onChange={e => onEdit(e)} />
                
                <div className="d-grid gap-2">
                    <button className="btn btn-success">Submit</button>
                </div>
            </form>
            
            <button onClick={deleteUser} className="btn btn-danger">Delete Account</button><br/>
            <Link to="/dashboard" className="btn">Back</Link>
            
        </Fragment>
    )
}

export default EditProfile;