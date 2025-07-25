
import React, { useContext } from 'react'
import Info from './_components/Info'
import LogoList from './_components/LogoList'
import { UserDetailContext } from '../_context/UserDetailContext'

function Dashboard() {
   
  return (
    <div className='mt-20'>
        <Info/>
        <LogoList/>
    </div>
  )
}

export default Dashboard