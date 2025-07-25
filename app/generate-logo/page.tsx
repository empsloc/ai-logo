"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import { title } from "process";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, LayoutDashboard } from "lucide-react";
import Link from "next/link";

function GenerateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState<any>();
  useEffect(() => {
    if (typeof window != undefined) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));

        console.log(JSON.parse(storage));
      }
    }
  }, []);

  useEffect(() => {
    if (formData) {
      GenerateAILogo();
    }
  }, [formData]);
  const GenerateAILogo = async () => {
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.pallete)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);

    console.log(PROMPT);

    //Generate Logo Prompt from AI
    //Genrate Logo Image

    const result = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail?.email,
      title: formData.title,
      desc: formData.desc,
    });
    console.log(result?.data);
    setLogoImage(result?.data?.image);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center mt-16">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <Image src="/loading.gif" alt="Loading..." width={100} height={100} />
          <p className="text-lg font-medium text-muted-foreground">Generating your logo...</p>
        </div>
      ) : logoImage ? (
        <div className="flex flex-col items-center gap-5">
          <h2 className="font-bold text-3xl text-primary">Your logo is ready!</h2>
          <Image className="rounded-2xl" src={logoImage} alt="logo" width={200} height={200} />
          <div className="flex gap-2">
            <a href={logoImage} download="generated-logo.png">
              <Button className="cursor-pointer">
                <Download className="mr-2" />
                Download
              </Button>
            </a>
            <Link href="/dashboard">
              <Button variant="outline" className="cursor-pointer">
                <LayoutDashboard className="mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Preparing your logo...</p>
      )}
    </div>
  );
}

export default GenerateLogo;
