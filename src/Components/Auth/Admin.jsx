import React from 'react'
import AuthForm from './AuthForm';
import { sendAdminAuth } from '../../Api Helper/apiHelp';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../Store';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const disPatch= useDispatch();
  const onResRecive=(data)=>{
    console.log(data);
    disPatch(adminActions.login());
    localStorage.setItem("admin",data.id);
    localStorage.setItem("token",data.token);
    navigate('/');
  }
  const getData =(data)=>{
    console.log("Admin ",data);
    sendAdminAuth(data.inputs)
    .then(onResRecive)
    .catch((err)=>console.log(err));
  };
return (
  <div>    
    <AuthForm onSubmit={getData} isAdmin={true}/>
  </div> 
)
   
}

export default Admin