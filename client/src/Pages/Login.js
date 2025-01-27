import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate();

  const login = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.post("/auth/login",{username,password});
        console.log(response);
        localStorage.setItem("token",response.data.token);
        toast.success(`${response.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigate('/home');
    }
    catch(error){
        toast.error(`Error: ${error.response.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }
  }

  return (
    <>
    <div className='d-flex justify-content-center align-items-center' style={{"height":"100vh"}}>
        <form className='w-25 shadow p-5 rounded'>
            <h2>Login</h2>
            <input placeholder='Enter Username' onChange={(e)=>setusername(e.target.value)} className='form-control my-4'></input>
            <input placeholder='Enter Password' onChange={(e)=>setpassword(e.target.value)} type='password' className='form-control my-4'></input>
            <button className='btn btn-primary' onClick={login}>Login</button>
            <p className='mt-4 mb-1'>Or Register <span><Link to="/register">Here</Link></span></p>
        </form>
    </div>
    </>
  )
}

export default Login