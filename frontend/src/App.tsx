import { useState, lazy, Suspense } from 'react'
import { Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
// import Authentication from './middleware/Authentication';
import { useSelector } from 'react-redux';
import Authentication from './middleware/Authentication';

const Login = lazy(() => import('./page/Login'))
const Home = lazy(() => import('./page/Home'))

function App() {
  // const { userInfo } = useSelector((state) => state.auth)
  // const navigate = useNavigate()
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      } />
        <Route element={<Authentication />}>
          <Route path="/home" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          } />
        </Route>
        {/* {
          () => {
            if (userInfo) {
              return <Route path="/home" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              } />
            } else {
              return <Route path="/" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              } />
            }
          }
        } */}
      
      
      {/* <Authentication>
        <Route path="/home" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        } />
      </Authentication> */}
      <Route element={<Authentication />}>
        <Route path="/home" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        } />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
