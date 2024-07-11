import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setemail] = useState('');
  const [username, setname] = useState('');
  const [password, setpassword] = useState('');

  const Register = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.post("/auth/register",{email,username,password});
        toast.success(`${response.data.message}. Proceed to login`, {
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
            <h2>Register</h2>
            <input placeholder='Enter Email' type='email' onChange={(e)=>setemail(e.target.value)} className='form-control my-4'></input>
            <input placeholder='Enter Username' onChange={(e)=>setname(e.target.value)} className='form-control my-4'></input>
            <input placeholder='Enter Password' onChange={(e)=>setpassword(e.target.value)} type='password' className='form-control my-4'></input>
            <button className='btn btn-primary' onClick={Register}>Register</button>
            <p className='mt-4 mb-1'>Or Register <span><Link to="/">Here</Link></span></p>
        </form>
    </div>
    </>
  )
}

export default Register