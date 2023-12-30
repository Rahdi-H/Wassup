import React, { useEffect, useState } from 'react'
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../supabase_config';
import { setMessagesList } from '../state/slices/messagesSlice';

function Messages({getMessage}) {
  const messagess = useSelector(state=> state.messagesList.messagesList)
  console.log("messagesss" , messagess);
  const selectedUser = useSelector(state => state.selectedUser.selectedUser)
  const user = useSelector(state => state.user.user)
  
  useEffect(()=> {
    if (selectedUser){
      getMessage()
      
    }
  },[selectedUser])
  return (
    <>
      {messagess?.map((msg)=>(
        <Message key={msg.id} msg={msg} user={user} selectedUser={selectedUser}/>
      ))}
    </>
  )
};

export default Messages;