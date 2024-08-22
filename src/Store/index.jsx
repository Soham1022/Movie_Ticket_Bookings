import {createSlice,configureStore } from '@reduxjs/toolkit';


const UserSlice=createSlice({
    name:"user",
    initialState:{isLoggedIn: false},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            localStorage.removeItem("user");
            state.isLoggedIn=false;
        }
    }
})
 
const adminSlice = createSlice({
    name:"auth",
    initialState:{isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            localStorage.removeItem("admin");
            localStorage.removeItem("token");
            state.isLoggedIn=false;
        }
    }
})

export const userActions=UserSlice.actions;
export const adminActions=adminSlice.actions;
export const store=configureStore({
    reducer:{
        user:UserSlice.reducer,
        admin:adminSlice.reducer
    }
})