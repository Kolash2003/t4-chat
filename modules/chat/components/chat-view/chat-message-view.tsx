"use client";
import React, { useState } from 'react'
import ChatWelcomeTabs from './chat-welcome-tabs';
import ChatMessageForm from './chat-message-form';

type ChatUser = {
    name: string | null;
} | null;

const ChatMessageView = ({ user }: { user: ChatUser }) => {

    const [selectedMessage, setSelectedMessage] = useState("");

    const handleMessageSelect = (message: string) => {
        setSelectedMessage(message);
    }

    const handleMessageChange = () => {
      setSelectedMessage("");
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-10'>
      <ChatWelcomeTabs
        username={user?.name ?? undefined}
        onMessageSelect={handleMessageSelect}
        />
      
      <ChatMessageForm 
        intialMessage={selectedMessage}
        onMessageChange={handleMessageChange}
      />
    </div>
  )
}

export default ChatMessageView
