"use client"
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Colors from "@/app/_data/Colors";

function LogoColorPallete({onHandleInputChange, formData}:any) {
    const [selectedOption, setSelectedOption] = useState<any>(formData?.pallete)
  return (
    <div>
      <HeadingDescription
        title={Lookup.LogoColorPaletteTitle}
        description={Lookup.LogoColorPaletteDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Colors.map((pallete: any, index: any) => (
          <div key={index} className={`flex cursor-pointer p-1 ${selectedOption==pallete.name&&'border-2 rounded-lg border-primary'}`}>
            {pallete?.colors.map((color: any, index: any) => (
              <div
                key={index}
                onClick={()=>{onHandleInputChange(pallete.name);setSelectedOption(pallete.name)}}
                className="h-24 w-full"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoColorPallete;
