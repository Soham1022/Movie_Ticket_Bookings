import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from './Components/Header/Header';
import HomePage from './Components/Header/HomePage';
import Movie from './Components/Movie/Movie';
import Auth from './Components/Auth/Auth'
import Admin from './Components/Auth/Admin';
import { adminActions, userActions } from './Store';
import Bookings from './Components/Bookings/Bookings';
import UserProfile from './Profile/UserProfile';
import AddMovie from './Components/Movie/AddMovie';
import AdminProfile from './Profile/AdminProfile';

function App() {
  const dispatch=useDispatch();
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn);
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
  console.log('Admin Login-',isAdminLoggedIn);
  console.log('User Login-',isUserLoggedIn);
  useEffect(()=>{
   if (localStorage.getItem("user")) {
    dispatch(userActions.login());
   }
   else if(localStorage.getItem("admin")){
   dispatch(adminActions.login());
   }
  },[])
  return (
    <div className="App">
      <Header/>
     <section>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/movies' element={<Movie/>}/>
        {!isUserLoggedIn && !isAdminLoggedIn && (<>{" "}
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/auth' element={<Auth/>}/></>)}
       {isUserLoggedIn && !isAdminLoggedIn && (<>{" "}
       <Route path='/user' element={<UserProfile/>}/>
        <Route path='/booking/:id' element={<Bookings/>}/></>)}
       {!isUserLoggedIn && isAdminLoggedIn &&(<>{" "}
       <Route path='/add' element={<AddMovie/>}/>
        <Route path='/user-admin' element={<AdminProfile/>}/></>)}
      </Routes>
     </section>
    </div>
  );
}

export default App;
