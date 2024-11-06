import React, { useEffect, useState } from 'react'
import { useAxios } from '../hook/useAxios'
import MovieCard from './MovieCard'
import { Pagination } from '@mui/material'

function MoviePage({URL}) {
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(10)
  const [page, setPage] = useState(1)

  useEffect(() => {
    useAxios().get(`${URL}?language=en-US&page=${page}`).then(res => {
      setData(res.data.results.map(item => {
        item.isLiked = 0
        item.isSaved = 0
        return item
      }))
      setTotalPage(res.data.total_pages)
    })
  }, [page])

  function handlePaginationChange(e, count){
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 300);
    setPage(count)
  }

  return (
    <>
    <div className='flex justify-between flex-wrap gap-[30px] p-6'>
      {data.map(item => <MovieCard key={item.id} item={item}/>)}
    </div>
    <div className='flex justify-center py-2 bg-slate-50'>
      <Pagination onChange={handlePaginationChange} count={totalPage}/>
    </div>
    </>
  )
}

export default MoviePage