import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { IMG_URL } from '../hook/useEnv'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { Context } from '../context/Context'
import { useNavigate } from 'react-router-dom'

export default function MovieCard({ item }) {
  const navigate = useNavigate()
  const { likedList, setLikedList, savedList, setSavedList } = React.useContext(Context)

  const handleToggle = (list, setList, item) => {
    const index = list.findIndex((movie) => movie.id == item.id)
    if (index == -1) {
      setList([...list, item])
    } else {
      list.splice(index, 1)
      setList([...list])
    }
  }

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "15px" }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <CardMedia
              className='!w-[50px] h-[50px]'
              component="img"
              width={50}
              height={50}
              image={`${IMG_URL}/${item.backdrop_path}`}
              alt={item.title}
            />
          </Avatar>
        }
        title={<h2 className='line-clamp-1'>{item.title}</h2>}
        subheader={item.release_date}
      />
      <CardMedia
        onClick={() => navigate(`/movie/${item.id}`)}
        className='h-[350px] cursor-pointer'
        component="img"
        height="194"
        image={`${IMG_URL}/${item.poster_path}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography className='line-clamp-3' variant="body2" sx={{ color: 'text.secondary' }}>
          {item.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => handleToggle(likedList, setLikedList, item)} aria-label="add to favorites">
          {likedList.some((movie) => movie.id == item.id) ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteIcon />
          )}
        </IconButton>
        <IconButton onClick={() => handleToggle(savedList, setSavedList, item)} aria-label="save to bookmarks">
          {savedList.some((movie) => movie.id == item.id) ? (
            <BookmarkIcon color="primary" />
          ) : (
            <BookmarkIcon />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
