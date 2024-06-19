import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import MessageContainer from '../../components/messages/MessageContainer.jsx'
export default function Home() {
  return (
    <div>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}
