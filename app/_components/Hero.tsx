"use client"
import React, { useState } from 'react'
import Lookup from '../_data/Lookup'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Hero() {
    const [logoTitle, setLogoTitle] = useState<any>()
  return (
    <div className='flex items-center mt-24 flex-col gap-5'>
        <h2 className='text-primary text-5xl text-center font-bold'>
            {Lookup.HeroHeading}
        </h2>
        <h2 className='text-5xl text-center font-bold'>
            {Lookup.HeroSubheading}
        </h2>
        <p className='text-lg text-gray-500 text-center'>
            {Lookup.HeroDesc}
        </p>
        <div className='grid grid-cols-2 gap-6 w-full   max-w-2xl mt-10 justify-center'>
            <input onChange={(event)=>setLogoTitle(event?.target.value)} className='p-3 border rounded-md w-full shadow-md' placeholder={Lookup.InputTitlePlaceholder}/>
           <Link href={'/create?title='+logoTitle}>  <Button className='p-6 w-full'>Get Started</Button></Link>
        </div>
    </div>
  )
}

export default Hero