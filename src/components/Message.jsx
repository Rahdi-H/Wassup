import React, { useEffect, useRef } from 'react';
import rahdi from '../images/rahdi.jpg'
import { useSelector } from 'react-redux';

function Message({msg, user, selectedUser}) {
  const messagesList = useSelector(state=> state.messagesList.messagesList)
  console.log(messagesList, "messges lissssst");
  const msgRef = useRef(null)
  console.log("msg", msg);
  console.log("user", user);
  useEffect(()=> {
    msgRef.current?.scrollIntoView({behaviour: "smooth"})
  }, [msg])
  return (
    <>
    {msg.sender != user.user_id ?
      <div className='message flex mt-4'>
        <div>
          <div className='Info flex flex-col justify-center items-center'>
          {msg.sender == selectedUser.user_id ? 
              <img srcSet={selectedUser.photo_url} alt="" className='rounded-full h-10 w-10'/>
              :
              <img srcSet={user.photo_url} alt="" className='rounded-full h-10 w-10'/>
            }
          </div>
        </div>
        <div className='content p-2 text-lg w-fit text-black'>
          <p className='bg-white w-fit p-2 rounded-r-xl rounded-b-xl'>{msg.message}</p>
          {/* <img src={rahdi} alt="" srcset="" className='bg-white w-2/4' /> */}
          <span>
          <span className='text-gray-300 text-xs'>{msg.time}, </span>
          <span className='text-gray-300 text-xs'>{msg.date}</span>
          </span>
        </div>
      </div>
      : 
      <div className='message flex mt-4 flex-row-reverse w-full'>
        <div>
          <div className='Info flex flex-col justify-center items-center '>
            {msg.sender != selectedUser.user_id ? 
              <img srcSet={user.photo_url} alt="" className='rounded-full h-10 w-10'/>
              :
              <img srcSet={selectedUser.photo_url} alt="" className='rounded-full h-10 w-10'/>
            }
          </div>
        </div>
        <div className='content p-2 text-lg w-fit text-slate-200 flex flex-col justify-end items-end'>
          <p className='bg-gray-900 w-fit p-2 rounded-l-xl rounded-b-xl'>{msg.message}</p>
          {/* <img src={rahdi} alt="" srcset="" className='bg-white w-2/4' /> */}
          <span>
          <span className='text-gray-300 text-xs'>{msg.time}, </span>
          <span className='text-gray-300 text-xs'>{msg.date}</span>
          </span>
        </div>
      </div>
      }
      <div ref={msgRef} />
    </>
  )
};

export default Message;