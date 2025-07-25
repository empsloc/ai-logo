"use client";
import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import { useSearchParams } from "next/navigation";

function LogoTitle({ onHandleInputChange }: any) {
  const searchParams = useSearchParams();
  // const title = searchParams?.get('title')
  const [title, setTitle] = useState(searchParams?.get("title"));
  useEffect(()=>{
    onHandleInputChange(title)
  },[])
  return (
    <div>
      <HeadingDescription
        title={Lookup.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />
      <input
        onChange={(e) => onHandleInputChange(e.target.value)}
        defaultValue={title!}
        className="p-4 border rounded-lg mt-5 w-full"
        type="text"
        placeholder={Lookup.InputTitlePlaceholder}
      />
    </div>
  );
}

export default LogoTitle;
