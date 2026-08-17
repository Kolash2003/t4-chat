import { requireAuth } from '@/modules/authentication/actions'
import React from 'react'

const AuthLayout = async ({children}: {children: React.ReactNode}) => {
    const session = await requireAuth();

  return (
    <div className='flex h-screen overflow-hidden'>
      <main className='flex-1 overflow-hidden'>
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
