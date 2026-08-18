"use client";
import React, { useState } from 'react'
import ChatWelcomeTabs from './chat-welcome-tabs';

type ChatUser = {
    name: string | null;
} | null;

const ChatMessageView = ({ user }: { user: ChatUser }) => {

    const [selectedMessage, setSelectedMessage] = useState("");

    const handleMessageSelect = (message: string) => {
        setSelectedMessage(message);
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-10'>
      <ChatWelcomeTabs
        username={user?.name ?? undefined}
        onMessageSelect={handleMessageSelect}
        />
      {selectedMessage && (
        <p className="text-sm text-muted-foreground">{selectedMessage}</p>
      )}
    </div>
  )
}

export default ChatMessageView
