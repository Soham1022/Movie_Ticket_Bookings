import { Box, Typography,Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from '../Movie/MovieItem'
import { Link } from 'react-router-dom'
import {getAllMovies} from '../../Api Helper/apiHelp'

const HomePage = () => {
  const [movie,setMovie]=useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovie(data.data))
      .catch((err) => console.log(err));
  }, []);
  // console.log(movie);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={'auto'} width="80%" height={"40vh"} padding={2}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFRBi7v7cp2tYu2YxdvK4DZO3vySX6tzxldg&s" alt="83" width={"100%"} height={"100%"}/>
      </Box>
      <Box padding={5} margin="auto">
       <Typography varient="h4" textAlign={"center"}>Latest Releases</Typography>
      </Box>
      <Box display={"flex"} width={"100%"} justifyContent={"center"} flexWrap={"wrap"}>{movie && movie.slice(0,4).map((movie,index)=><MovieItem id={movie._id} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} title={movie.title} key={index}/>)}</Box>
      <Box display="flex" padding={5} margin={"auto"}>
        <Button LinkComponent={Link} to='/movies' varient="outlined" sx={{margin:"auto",color:"#2b2d42", background:"blur"}}> View All Movies</Button>
      </Box>
    </Box>
  )
}

export default HomePage