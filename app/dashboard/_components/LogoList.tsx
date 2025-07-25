"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

function LogoList() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState<any>([]);
  useEffect(() => {
    userDetail && GetUserLogo();
  }, [userDetail]);
  const GetUserLogo = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    );
    setLogoList([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setLogoList((prev: any) => [...prev, doc.data()]);
    });
  };

  const viewLogo =(image:any)=>{
    const imageWindow = window.open()
    imageWindow?.document.write(`<img src="${image}" alt="base64 image"/>`)

  }
  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {logoList?.length > 0
          ? logoList.map((logo: any, index: any) => <div onClick={()=>viewLogo(logo?.image)} className="hover:scale-105 transition-all cursor-pointer" key={index}>
            <Image alt={logo?.title} src={logo?.image} width={400} height={200} className="w-full rounded-xl"/>
            <h2 className="text-center text-lg mt-2 font-medium">{logo?.title}</h2>
            <p className="text-sm text-gray-500 text-center">{logo?.desc}</p>
          </div>)
          : [1, 2, 3, 4, 5, 6].map((item: any, index: any) => (
              <div className="bg-slate-200 animate-pulse rounded-xl w-full h-[200px]" key={index}></div>
            ))}
      </div>
    </div>
  );
}

export default LogoList;
