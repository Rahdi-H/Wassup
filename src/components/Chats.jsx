import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../supabase_config';
import IndividualChat from './IndividualChat';

function Chats() {
  const user = useSelector(state=> state.user.user)
  const chatList = useSelector(state=> state.chatList.chatList)
  console.log("Chat list ", chatList);
  
  return (
    <>
    {chatList ? chatList.map((chat)=> (
      <IndividualChat key={chat.id} friend_id={chat.friend_id} msg={chat.last_message} />
    )) : ""}
    </>
  )
}

export default Chats;