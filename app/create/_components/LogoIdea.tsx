import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import axios from "axios";
import Prompt from "@/app/_data/Prompt";
import { Loader2Icon } from "lucide-react";

function LogoIdea({ formData, onHandleInputChange }: any) {
  const [ideas,setIdeas] = useState<any>()
  const [loading,setLoading] =useState(false)
  const [selsectedOption, setSelectedOption] = useState<any>(formData?.idea)
  useEffect(()=>{
generateLogoDesignIdea()
  },[])
  const generateLogoDesignIdea = async () => {
setLoading(true)
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      "{logoType}",
      formData?.design.title
    )
      .replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoPrompt}", formData?.design.prompt);
    const result = await axios.post('/api/ai-design-ideas',{
      prompt:PROMPT
    })
    console.log(result.data)
    setIdeas(result.data.ideas)
    
    setLoading(false)
  };
  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
  <div className="flex items-center justify-between">
      {loading&&<Loader2Icon className="animate-spin my-10"/>}
      </div> 
      <div className="flex flex-wrap gap-3 mt-6">
      {ideas&&ideas.map((item:any,index:any)=>(
        <h2 onClick={()=>{onHandleInputChange(item);setSelectedOption(item)}} key={index} className={`p-2 cursor-pointer hover:border-primary rounded-full border px-3 ${selsectedOption==item&&'border-primary'}`}>
{item} 
        </h2>
      ))}
      <h2 onClick={()=>{onHandleInputChange('Let AI select the best idea');setSelectedOption('Let AI select the best idea')}} className={`p-2 cursor-pointer hover:border-primary rounded-full border px-3 ${selsectedOption=='Let AI select the best idea'&&'border-primary'}`}>Let AI select the best idea</h2>

      </div>
    </div>
  );
}

export default LogoIdea;
