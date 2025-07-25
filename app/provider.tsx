'use client'
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetailContext } from "./_context/UserDetailContext";

type ProviderProps = {
  children: React.ReactNode;
};

function Provider({ children }: ProviderProps) {
  const {user} = useUser()
  const [userDetail,setUserDetail] = useState<any>()
  //Save user data
  useEffect(()=>{
user&&CheckUserAuth()
  },[user])

  const CheckUserAuth= async()=>{

    //Save user to database
    const result = await axios.post('/api/user',{
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress

    })
    console.log(result.data)
    setUserDetail(result.data)
  }
  return (
    <div>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <Header />
      <div className="p-4 px-10 lg:px-32 xl:px-48 2xl:px-56 ">
        {children}
      </div>
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;
