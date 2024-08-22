import React, { useState, useEffect } from "react";
import { AppBar, Autocomplete, IconButton, Tab, Tabs, TextField } from '@mui/material';
import { Box, Toolbar } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from '../../Api Helper/apiHelp';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../../Store";


const Header = () => {
    const navigate = useNavigate();
    const disPatch=useDispatch();
    const [value, setValue] = useState(0);
    const [movies, setMovie] = useState([]);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  
    useEffect(() => { getAllMovies()
        .then(data => setMovie(data.data))
        .catch(err => console.log(err)); 
    }, [])

    const handleChange = (e, val) => {
        const movie = movies.find((mov) => mov.title === val);
        console.log(movie);
        if (isUserLoggedIn) {
          navigate(`/booking/${movie._id}`);
        } 
      };

    return (<>
        <AppBar position="sticky" sx={{ bgcolor: "darkgrey" }}>
            <Toolbar>
                <Box width={"20%"}><IconButton to='/' LinkComponent={Link}><MovieIcon /></IconButton></Box>
                <Box width={"30%"} margin={"auto"}>
                    <Autocomplete onChange={handleChange} id="free-solo-demo" freeSolo options={movies.map((option) => option.title)} renderInput={(params) => (<TextField sx={{ input: { color: "white" } }} {...params} label="Search Across Multiple Movies" />)} />
                </Box>
                <Box display={"flex"}>
                    <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/movies" label="Movies" />
                        {!isAdminLoggedIn && !isUserLoggedIn && (<>
                            <Tab LinkComponent={Link} to="/auth" label="LogIn / Register" />
                            <Tab LinkComponent={Link} to="/admin" label="Admin" />
                        </>)}
                        {isUserLoggedIn && (<>{" "}
                            <Tab LinkComponent={Link} to="/user" label="user" />
                            <Tab onClick={()=>disPatch(userActions.logout())} LinkComponent={Link} to="/" label="Log out" />
                        </>)}
                        {isAdminLoggedIn && (<>
                            <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                            <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                            <Tab onClick={()=>disPatch(adminActions.logout())} LinkComponent={Link} to="/" label="Log out" />
                        </>)}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    </>
    )
}

export default Header