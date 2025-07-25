"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  const {user} = useUser()
  return (
    <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm '>
        <Image src={'/logo.svg'} alt='logo' height={100} width={180}/>
        <div className='flex gap-3 items-center'>
          {user&&<Button variant='outline'>Dashboard</Button>}
        {!user&&<Button>Get Started</Button>}
        {user&&<UserButton/>}
        </div>
    </div>
  )
}

export default Header