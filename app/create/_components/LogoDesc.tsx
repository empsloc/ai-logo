import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'

function LogoDesc({onHandleInputChange, formData}:any) {
  return (
    <div className='my-10'>
        <HeadingDescription title={Lookup.LogoDescTitle} description={Lookup.LogoDescDesc} />
        <input
                onChange={(e) => onHandleInputChange(e.target.value)}
                value={formData?.desc||" "}
                className="p-4 border rounded-lg mt-5 w-full"
                type="text"
                placeholder={Lookup.InputTitlePlaceholder}
              />
    </div>
  )
}

export default LogoDesc