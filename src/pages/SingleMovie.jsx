import React, { useEffect, useState } from 'react'
import { useAxios } from '../hook/useAxios'
import { API_KEY, IMG_URL } from '../hook/useEnv'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import YouTube from 'react-youtube'
import { CaretLeftOutlined } from '@ant-design/icons'

function SingleMovie() {
    const { id } = useParams()
    const [movieInfo, setMovieInfo] = useState({})
    const [actors, setActors] = useState([])
    const [changeImg, setChangeImg] = useState(false)
    const [videos, setVideos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        useAxios().get(`/${id}?api_key=${API_KEY}`).then(res => {
            setMovieInfo(res.data)
        })
    }, [id])

    useEffect(() => {
        useAxios().get(`/${id}/credits?api_key=${API_KEY}`).then(res => {
            setActors(res.data.cast || []) 
        })
    }, [id])

    useEffect(() => {
        useAxios().get(`/${id}/videos?api_key=${API_KEY}`).then(res => {
            setVideos(res.data.results.splice(0, 5) || []) 
        })
    }, [id])
    
    return (
        <>
        <div className='p-5 ml-10'>
        <CaretLeftOutlined onClick={() => navigate(-1)} className='scale-[4] text-red-700 cursor-pointer'/>
        </div>
        <div className='flex justify-between'>
            <div className='w-[20%] space-y-5 rounded-md p-5 border-[4px] border-white h-[90vh] overflow-y-auto'>
                <h1 className='text-center text-white text-[25px] font-bold mb-5'>Actors</h1>
                {actors.length > 0 ? (
                    actors.map(item => (
                        <div className='bg-[#000009] p-3 rounded-md' key={item.id}>
                            <img
                                className='h-[400px] rounded-md w-full object-cover'
                                src={item.profile_path ? `${IMG_URL}/${item.profile_path}` : '/path/to/default-image.jpg'}
                                alt="Actor img"
                            />
                            <h2 className='text-center text-[20px] font-bold text-white'>{item.character}</h2>
                            <p className='text-center text-[20px] font-bold text-white'>{item.name}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No actors information available.</p>
                )}
            </div>

            <div className='w-[54%] rounded-md p-5 border-[4px] border-white h-[90vh] overflow-y-auto'>
            <h1 className='text-center text-white text-[25px] font-bold mb-5'>Movie Info</h1>
                <h2 className='text-center text-[25px] mb-5 font-bold text-white'>{movieInfo.title}</h2>
                <h3 className='text-center text-[23px] mb-5 font-bold text-white'>{movieInfo.tagline}</h3>
                <p className='text-[20px] font-semibold text-white mb-5'>{movieInfo.overview}</p>
                <p className='text-white text-[20px] mb-5'>Budget: {movieInfo.budget} $</p>
                <div className='flex space-x-5 mb-5'>
                    {movieInfo?.genres?.map(item => (
                        <Button size='large' key={item.id} variant='contained'>{item.name}</Button>
                    ))}
                </div>
                <div onMouseLeave={() => setChangeImg(false)} onMouseEnter={() => setChangeImg(true)} className='h-[600px] rounded-md relative overflow-hidden'>
                    <img className={`h-[600px] absolute duration-300 rounded-md ${changeImg ? "left-[-120%]" : "left-0"}`} src={`${IMG_URL}/${movieInfo.poster_path}`} alt="Movie img" />
                    <img className={`h-[600px] absolute duration-300 rounded-md ${changeImg ? "right-0" : "right-[-120%]"}`} src={`${IMG_URL}/${movieInfo.backdrop_path}`} alt="Movie img" />
                </div>
            </div>

            <div className='w-[25%] space-y-5 p-5 rounded-md border-[4px] border-white h-[90vh] overflow-y-auto'>
            <h1 className='text-center text-white text-[25px] font-bold mb-5'>Movie Trayler</h1>
                {videos.map(item => <YouTube className='w-full ' videoId={item.key} key={item.id}/>)}
            </div>
        </div>
        </>
    )
}

export default SingleMovie
