import React, { useEffect, useRef, useState } from 'react'
import Messages from './Messages'
import Input from './Input';
import menu from '../images/menu.png';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../supabase_config';
import { setMessagesList } from '../state/slices/messagesSlice';
import { setChatList } from '../state/slices/chatListSlice';

function Chat() {
  const dispatch = useDispatch()
  const selectedUser = useSelector(state => state.selectedUser.selectedUser)
  const user = useSelector(state => state.user.user)
  console.log(user);
  const [firend, setFriend] = useState(false)
  async function isFriend() {
    if (!selectedUser){
      return
    }
    try {
      const { data: userChats, error } = await supabase
        .from('userChats')
        .select("*")
        // Filters
        .eq('user_id', user?.user_id)
        .eq("friend_id", selectedUser?.user_id)
      if (userChats[0]) {
        setFriend(true)
        dispatch(setChatList(userChats))
      };
    } catch (error) {
      setFriend(false)
    }
  }
  async function addFriend() {
    try {
      const { data, error } = await supabase
        .from('userChats')
        .insert([
          { user_id: user.user_id, friend_id: selectedUser.user_id },
          { user_id: selectedUser.user_id, friend_id: user.user_id },
        ])
        .select();

      console.log(data);
      setFriend(true)
    } catch (error) {
      console.log(error.message);
    }

  }
  async function getMessage (){
    const combinedID = selectedUser.user_id > user.user_id ? `${selectedUser.user_id}${user.user_id}` : `${user.user_id}${selectedUser.user_id}`;
    const { data: existingMessages, error: fetchError } = await supabase
    .from('messages')
    .select('*')
    .eq('combined_id', combinedID);
    if(existingMessages.length > 0){
      dispatch(setMessagesList(existingMessages[0].message))
    } else {
      
    }
  }
  async function getChatList(){
    try{
      const { data: userChats, error } = await supabase
      .from('userChats')
      .select("*")
      // Filters
      .eq('user_id', user.user_id)
      if (userChats){
        console.log("Hello user Chats", userChats);
        dispatch(setChatList(userChats))
      }
    } catch (error) {
      console.log(error.message);
    }
}
  useEffect(() => {
    isFriend()
    try{
      getChatList()
    } catch (error){
      console.log("No chat list");
    }
  }, [selectedUser, addFriend])
  console.log(firend);
  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='ChatInfo flex justify-between p-2 w-full bg-gray-900'>
        {selectedUser ? <div className='flex'>
          <img srcSet={selectedUser?.photo_url} alt="User Photo" className='rounded-full h-8 w-8' />
          <h2 className='flex items-center'>{selectedUser?.username}</h2>
        </div> : <div></div>}
        <button title='Menu'><img src={menu} className='w-8 h-8' alt="menu" /></button>
      </div>
      {selectedUser ?
        <div className='p-2 h-full flex flex-col overflow-y-scroll scrollbar scrollbar-thin  scrollbar-track-slate-600 scrollbar-thumb-blue-900'>
          {firend ? <Messages getMessage={getMessage} /> : <div className='flex justify-center items-center'><div onClick={addFriend} className=' cursor-pointer text-lg text-black py-2 px-4 bg-slate-300 hover:bg-slate-400'>Add in chat list</div></div>}

        </div>
        : ""}
      {selectedUser ?
        <div>
          <Input getMessage={getMessage}/>
        </div>
        : ""}
    </div>
  )
}

export default Chat