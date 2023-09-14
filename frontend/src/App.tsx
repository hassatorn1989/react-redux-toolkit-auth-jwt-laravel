import * as React from "react";
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import axios from "axios";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "./components/Layout";

axios.defaults.withCredentials = true;
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Login />
          </React.Suspense>
        } />
        <Route element={<PrivateRoutes />}>
          
          <Route element={<Layout />}>
            <Route path="/Home" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Home />
              </React.Suspense>
            } />
            <Route path="/about" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <About />
              </React.Suspense>
            } />
          </Route>
        </Route>
        
      </Routes>
    </>
  )
}

export default App
