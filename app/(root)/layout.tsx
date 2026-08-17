import { requireAuth } from '@/modules/authentication/actions'
import React from 'react'
import ChatSideBar from '@/modules/chat/components/chat-sidebar'
import Header from '@/components/header';

const AuthLayout = async ({children}: {children: React.ReactNode}) => {
    const session = await requireAuth();

  return (
    <div className='flex h-screen overflow-hidden'>
        <ChatSideBar user={session?.user}/>
      <main className='flex-1 overflow-hidden'>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
