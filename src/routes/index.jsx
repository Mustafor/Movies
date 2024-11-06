import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Popular, SingleMovie, TopRated, UpComing } from '../pages'
import { PATH } from '../hook/usePath'
import Loading from '../assets/images/loading.gif'

const NowPlaying = lazy(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve(import('../pages/NowPlaying'))
  }, 2000)
}))

function CustomRoutes() {
  return (
    <Routes>
      <Route path={PATH.home} element={
          <Suspense fallback={
          <img className='absolute left-0 right-0 top-0 bottom-0 m-auto' src={Loading} alt='Loading...' width={250}/>
          }>
            <NowPlaying />
          </Suspense>
        }
      />
      <Route path={PATH.popular} element={<Popular />} />
      <Route path={PATH.topRated} element={<TopRated />} />
      <Route path={PATH.upcoming} element={<UpComing />} />
      <Route path={PATH.singleMovie} element={<SingleMovie />} />
    </Routes>
  );
}

export default CustomRoutes;
