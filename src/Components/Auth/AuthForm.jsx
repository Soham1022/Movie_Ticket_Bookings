import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';

const AuthForm = ({onSubmit,isAdmin}) => {
  const [inputs,setInputs]=useState({name:'',email:'',password:'',number:''})
  const [signUp, setSignUp] = useState(false)
  const handleChange=(e)=>{
    setInputs((input)=>({...input,[e.target.name]:e.target.value}));
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    onSubmit({inputs,signup:isAdmin?false:signUp});
  }
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: 'auto', padding: 1 }}>
        <IconButton LinkComponent={Link} to='/'><ClearIcon/></IconButton>
      </Box>
      <Typography variant='h4' textAlign={"center"}>
      {signUp?"SignUp":"Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box padding={2.3} display={'flex'} justifyContent={'center'} flexDirection={'column'} width={450} height={400} margin={'auto'} alignContent={'center'}>
          {!isAdmin &&signUp && (<>{" "}
            <FormLabel >Name</FormLabel>
            <TextField margin='normal' variant='standard' type='text' name="name" value={inputs.name} onChange={handleChange}/>
          </>)}
          <FormLabel >Email</FormLabel>
            <TextField margin='normal' variant='standard' type='email' name="email" value={inputs.email} onChange={handleChange}/>
          <FormLabel >Password</FormLabel>
          <TextField margin='normal' variant='standard' type='password' name="password" value={inputs.password} onChange={handleChange}/>          
          {signUp && (<>{" "}
            <FormLabel sx={{mb:1}}>Phone No.</FormLabel>
            <TextField margin='normal' variant='standard' type='text' name="number" value={inputs.number} onChange={handleChange}/>
          </>)}
          <Button sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }} type='submit' fullWidth variant='contained'>{signUp?"SignUp":"Login"}</Button>
          {!isAdmin && (<Button onClick={()=>{setSignUp(!signUp)}} sx={{ mt: 2, borderRadius: 10 }} fullWidth >{signUp?"Login":"Register"}</Button>)}
        </Box>
      </form>
    </Dialog>
  )
}

export default AuthForm