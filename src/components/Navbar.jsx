import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Badge } from '@mui/material';
import { PATH } from '../hook/usePath';
import { Context } from '../context/Context';

const navItems = [
    {
        id:1,
        title:"Now Playing",
        to: PATH.home
    },
    {
        id:2,
        title:"Popular",
        to: PATH.popular
    },
    {
        id:3,
        title:"Top Rated",
        to: PATH.topRated
    },
    {
        id:4,
        title:"Upcomming",
        to: PATH.upcoming
    },
]

function Navbar() {
    const {likedList, setLikedList} = React.useContext(Context)

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar className='!bg-slate-950' component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MOVIES
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.id} sx={{ color: '#fff' }}>
                <NavLink to={item.to} key={item.id}>
                    {item.title}
                </NavLink>
              </Button>
            ))}
          </Box>
          <Box sx={{display:"flex", gap:"20px", marginLeft:"30px"}}>
            <Button variant='outlined' sx={{borderRadius:"50%", borderColor:"white"}}>
                <Badge showZero badgeContent={likedList.lenght} color='error'>
                <FavoriteIcon sx={{color:"white"}}/>
                </Badge>
            </Button>
            <Button variant='outlined' sx={{borderRadius:"50%", borderColor:"white"}}>
                <Badge showZero badgeContent={0} color='primary'>
                <BookmarkIcon sx={{color:"white"}}/>
                </Badge>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
