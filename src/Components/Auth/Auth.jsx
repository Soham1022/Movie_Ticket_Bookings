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
    disPatch(userActions.login());
    localStorage.setItem("user",data.id)
    navigate('/');
  }
   const getData =async (data)=>{
      console.log("Auth ",data.id);
      try {
        const result = await sendUserAuthReq(data.inputs,data.signup);
        onResRecive(result)
      } catch (error) {
        console.log(error)
      }
    };
  return (
    <div>    
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div> 
  )
}

export default Auth