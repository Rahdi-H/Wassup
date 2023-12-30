import React, { useEffect, useState } from 'react'
import rahdi from '../images/rahdi.jpg';
import logout from '../images/logout.png';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../supabase_config';
import { clearUser } from '../state/slices/userSlice';
import { useNavigate } from 'react-router';

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state)=> state.user.user)
  console.log(user);
  const signOut = async () => {
    const {error} = await supabase.auth.signOut()
    if (error){
        console.log(error.message);
    } else {
        dispatch(clearUser())
    }
  }
  
  console.log(user);
  useEffect(()=> {
    if (user == null){
      navigate('/login')
    }
  },[user])
  return (
    <>
      <div className='flex items-center justify-between bg-gray-800 p-2'>
        <h2 className=' text-xl'>Wassup</h2>
        <span className='flex space-x-1 items-center'>
          <img srcSet={user?.photo_url} alt="User Photo" className='rounded-full h-8 w-8'/>
          <h3>{user?.username}</h3>
          <button className='w-8 h-8' title='Logout' onClick={signOut}><img srcSet={logout} alt="Logout" /></button>
        </span>
      </div>
    </>
  )
};

export default Navbar;