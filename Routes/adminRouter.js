const express = require ('express');
const adminController =  require('../Controller/adminController')



const adminRouter=express.Router();

adminRouter.post('/SignUp',adminController.signUp);
adminRouter.post('/SignIn',adminController.signIn);
adminRouter.get('/',adminController.getAdmin);
adminRouter.get('/:id',adminController.getAdminById);

 
module.exports=adminRouter;