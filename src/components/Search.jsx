import React, { useEffect, useState } from 'react'
import rahdi from '../images/rahdi.jpg'
import supabase from '../supabase_config'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../state/slices/seletedUserSlice'

function Search() {
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)
  console.log(user.user);
  const selectedUser = useSelector((state)=> state.selectedUser)
  const [username, setUsername] = useState("")
  const [profile, setProfile] = useState(null)
  function handleSearch() {
    async function getInfo(){
      const { data: Profiles, error } = await supabase
      .from('Profiles')
      .select('*')
      .ilike("username", username)
      console.log(Profiles[0]);
      if (Profiles[0]){
          setProfile(Profiles[0])
          console.log(profile);
        }
      }
      getInfo()
    }
    function handleEnter(e) {
      e.code === "Enter" && handleSearch()
    }
    function ClickOnProfile() {
      dispatch(setSelectedUser(profile))
      setUsername('');
      setProfile(null)
      // Check if chat exists
      // const combinedID = selectedUser.selectedUser.user_id > user.user.user_id ? `${selectedUser.selectedUser.user_id}+${user.user.user_id}` : `${user.user.user_id}${selectedUser.selectedUser.user_id}`; 
      // console.log(combinedID);
      
    }
    useEffect(()=> {
      if (profile){
      }
      
  }, [user, selectedUser])
  return (
    <div className='border-b-2 border-zinc-700'>
      <input value={username} onKeyDown={handleEnter} onChange={e=>setUsername(e.target.value)} type="text" name="search" id="search" placeholder='Find user' className='text-white bg-transparent w-full p-3 focus:outline-none border-b-2 border-gray-800' />
      {profile ? 
        <div onClick={ClickOnProfile} className='p-2 flex items-center space-x-2 hover:bg-gray-800 cursor-pointer'>
        <img srcSet={profile.photo_url} alt="user photo" className='rounded-full h-10 w-10' />
        <h2 className='text-lg'>{profile.username}</h2>
      </div> : ''  
    }
    </div>
  )
}

export default Search;