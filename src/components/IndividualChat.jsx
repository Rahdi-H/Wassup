import React, { useEffect, useState } from 'react'
import supabase from '../supabase_config';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../state/slices/seletedUserSlice';

function IndividualChat({friend_id, msg}) {
    const selectedUser = useSelector(state=> state.selectedUser.selectedUser)
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(null)
    async function getInfo(){
        const { data: Profiles, error } = await supabase
        .from('Profiles')
        .select('*')
        .eq("user_id", friend_id)
        setProfile(Profiles[0])
        console.log("IndividualChat comp UseEffect");
    }
    function ClickOnProfile() {
        dispatch(setSelectedUser(profile))
    }
    useEffect(()=> {
        getInfo()
    }, [selectedUser])
  return (
    <>
    {profile? 
        <div onClick={ClickOnProfile} className='p-2 flex items-center space-x-2 hover:bg-gray-800 cursor-pointer'>
        <img src={profile.photo_url} alt="" className='rounded-full h-10 w-10'/>
        <div>
          <h2 className=' text-lg'>{profile.username}</h2>
          <p className='text-gray-400 text-sm'>{msg}</p>
        </div>
      </div>
        : ""}
    </>
  )
}

export default IndividualChat