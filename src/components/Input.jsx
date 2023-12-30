import React, { useState } from "react";
import clipicon from '../images/clip.png'
import send from '../images/send.png';
import { useSelector } from "react-redux";
import supabase from "../supabase_config";

function Input({getMessage}) {
  const timestamp = new Date().toISOString();
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  // Generate a UUID
  const uuid = generateUUID();
  console.log(uuid); // Output: A randomly generated UUID
  
  function formatDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  const formattedDate = formatDate();
  function formatTime() {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }
  
  const formattedTime = formatTime();
  
  
  const [exist, setExist] = useState(false)
  const [msg, setMsg] = useState('')
  const selectedUser = useSelector(state => state.selectedUser.selectedUser)
  const user = useSelector(state => state.user.user)
  const [image, setImage] = useState(null)
  async function sendMessage() {
    const combinedID = selectedUser.user_id > user.user_id ? `${selectedUser.user_id}${user.user_id}` : `${user.user_id}${selectedUser.user_id}`;
    console.log(combinedID);
      // Check if the message exists for the combined ID
      const { data: existingMessages, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .eq('combined_id', combinedID);
  
      if (fetchError) {
        console.log("Error fetching existing messages:", fetchError.message);
        // Handle fetch error
        return;
      }
      console.log(existingMessages, fetchError);
      if (existingMessages.length > 0) {
        // Row exists: Update the existing messages array with the new message
        const updatedMessages = [...existingMessages[0].message, {id: uuid, message: msg, sender: user.user_id, date: formattedDate, time: formattedTime }];
        console.log("updatede messages",updatedMessages);
        const { data: updatedData, error: updateError } = await supabase
        .from('messages')
        .update({ message: updatedMessages })
        .eq('combined_id', combinedID)
        .select();
        const {data: userChats1, error: userChatsError1} = await supabase
        .from('userChats')
        .update({last_message: msg, last_message_time: timestamp})
        .eq("user_id", user.user_id)
        .select();
        const {data: userChats2, error: userChatsError2} = await supabase
        .from('userChats')
        .update({last_message: msg, last_message_time: timestamp})
        .eq("user_id", selectedUser.user_id)
        .select();
        getMessage()
        console.log(...existingMessages[0].message, "length");
  
        if (updateError) {
          console.log("Error updating message:", updateError.message);
          // Handle update error
          return;
        }
  
        console.log('Messages updated:', updatedData);
        setMsg("");
      } else {
        // Row doesn't exist: Insert a new message for the combined ID
        const { data: insertedData, error: insertError } = await supabase
          .from('messages')
          .insert([{ combined_id: combinedID, message: [{id: uuid, message: msg, sender: user.user_id, date: formattedDate, time: formattedTime  }] }])
          .select();
          const {data: userChats, error: userChatsError} = await supabase
          .from('userChats')
          .insert([{user_id: user.user_id, friend_id: selectedUser.user_id, last_message: msg, last_message_time: timestamp},{user_id: selectedUser.user_id, friend_id: user.user_id, last_message: msg, last_message_time: timestamp}])
          .select();
          getMessage()

        if (insertError) {
          console.log("Error inserting new message:", insertError.message);
          // Handle insert error
          return;
        }
  
        console.log('New message inserted:', insertedData);
        setMsg('');
        setExist(true);
      }
  }
  
  return (
    <div className="bg-gray-900 flex justify-center  sticky">
      <input value={msg} onChange={(e)=> setMsg(e.target.value)} title="type message" type="text" name="msg" id="msg" placeholder="Your message here" className="bg-transparent p-3 focus:outline-none w-full"/>
      <input type="file" name="file" id="file" hidden onChange={e => setImage(e.target.files[0])}/>
      <div className='flex auto justify-center items-center'>
        <p className='text-white'>{image ? image.name: ""}</p>
        <label htmlFor="file" className="flex justify-center items-center p-1 cursor-pointer" ><img srcSet={clipicon} alt="File icon" className="h-auto w-8" title="Attach file"/></label>
      </div>
      <button onClick={sendMessage} className="px-4 py-0.5 bg-zinc-800 hover:bg-zinc-900"><img srcSet={send} alt="Send icon" className="h-8 w-8" title="Send message"/></button>
    </div>
  )
};

export default Input;