import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import LogoDesign from "@/app/_data/LogoDesign";
import Image from "next/image";

function LogoDesigns({onHandleInputChange, formData}:any) {
  const [selectedOption, setSelectedOption] = useState<any>(formData?.design?.title);
  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {LogoDesign.map((design: any, index: any) => (
          <div
            className={` p-1 hover:border-2 border-primary rounded-xl cursor-pointer ${
              selectedOption == design.title &&
              "border rounded-xl border-primary"
            }`}
            key={index}
            onClick={() => {onHandleInputChange(design);setSelectedOption(design.title)}}
          >
            <Image
              className="w-full rounded-xl h-[150px] object-cover"
              src={design.image}
              alt={design.title}
              width={300}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
