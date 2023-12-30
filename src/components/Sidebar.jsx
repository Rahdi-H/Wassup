import React from 'react'
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

function Sidebar() {
  return (
    <>
      <Navbar/>
      <Search/>
      <Chats/>
    </>
  )
}

export default Sidebar;