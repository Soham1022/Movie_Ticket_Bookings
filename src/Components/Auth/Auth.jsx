import React from 'react'
import AuthForm from './AuthForm';
import { sendUserAuthReq } from '../../Api Helper/apiHelp';
import { useDispatch } from 'react-redux';
import { userActions } from '../../Store';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const navigate= useNavigate();
  const disPatch=useDispatch();
  const onResRecive=(data)=>{
    console.log(data);
    disPatch(userActions.login());
    localStorage.setItem("user",data._id)
    navigate('/');
  }
   const getData =(data)=>{
      console.log("Auth ",data.id);
      sendUserAuthReq(data.inputs,data.signup)
      .then(onResRecive)
      .catch((err)=>console.log(err))
    };
  return (
    <div>    
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div> 
  )
}

export default Auth