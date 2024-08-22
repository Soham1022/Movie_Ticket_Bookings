import axios from 'axios';

export const getAllMovies=async()=>{
    const res=await axios.get("http://localhost:4000/movie/")
    .catch(err=>{
        console.log(err);
    })
    if (res.status !== 200) {
        console.log("No data");
    }
    const movie = res.data;
    return movie;
}

export const sendUserAuthReq = async (data, signup) => {
  const res = await axios.post(`http://localhost:4000/user/${signup ? "register" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
      number: data.number
    }
  )
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuth = async (data) => {
  const res = await axios.post("http://localhost:4000/admin/signin", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpectyed Error");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails=async(id)=>{
    const res=await axios.get(`http://localhost:4000/movie/${id}`)
    .catch((err)=>console.log(err));
   
    if (res.status!==200) {
      console.log("Unexpected Error Occurred");
  }
  
  const resData= await res.data;
  return resData;
}

export const newBooking= async(data)=>{
    const res=await axios.post('http://localhost:4000/booking',{movie:data.movie,date:data.date,seatno:data.seatno,user:localStorage.getItem('user')})
    .catch((err)=>{console.log(err)});

    if (res.status!==200) {
        return console.log("Unexpected Error");
    }

    const resData= await res.data;
    return resData;
}

export const getUserBookings=async()=>{
    const id=localStorage.getItem('user');
    const res =await axios.get(`http://localhost:4000/user/bookings/${id}`)
    .catch((err)=>{console.log(err)});

    if (res.status!==200) {
        return console.log("Unexpected Error");
    }

    const resData= await res.data;
    return resData;
}

export const getUserDetails=async()=>{
  const id=localStorage.getItem("user");
  const res =await axios.get(`http://localhost:4000/user/data/${id}`)
  .catch((err)=>{console.log(err)});

  if (res.status!==200) {
      return console.log("Unexpected Error");
  }

  const resData= await res.data;
  return resData;
}

export const deleteBooking= async(id)=>{
  const res=await axios.delete(`http://localhost:4000/booking/${id}`)
  .catch((err)=>{console.log(err)});
  
  if (res.status!==200) {
      return console.log("Unexpected Error");
  }

  const resData= await res.data;
    return resData;
}

export const addMovie=async(data)=>{
 const res=await axios.post('http://localhost:4000/movie',{title:data.title,description:data.description,releaseDate:data.releaseDate,posterUrl:data.posterUrl,featured:data.featured,actors:data.actors,admin:localStorage.getItem("admin")},
 {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
  .catch((err)=>console.log(err));
  
  if (res.status!==200) {
    return console.log("Unexpected Error");
}

const resData= await res.data;
return resData;
}

export const getAdminById=async()=>{
  // const id=localStorage.getItem("admin");
  const res = await axios.get(`http://localhost:4000/admin/${localStorage.getItem("admin")}`)
  .catch((err)=>console.log(err));

//   if (res.status!==200) {
//     return console.log("Unexpected Error");
// }

  const resData= await res.data;
return resData;
}