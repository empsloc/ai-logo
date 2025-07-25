import { AILogoPrompt } from "@/configs/AIModel";
import { db } from "@/configs/FirebaseConfig";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function POST(req: any) {
  const {email,title,desc, prompt } = await req.json();
  const dummyPrompt =
    "A futuristic robot mascot logo, metallic silver and blue, clean white background, vector style, tech startup";
  try {
    //Generate AI text prompt for LOGO
    const aiPromptResult = await AILogoPrompt(prompt);
    const AIPrompt = JSON.parse(aiPromptResult).prompt;
    // console.log(JSON.parse(aiPromptResult));

    //Generate Logo from AI model
    
    const response = await axios.post(
      "https://router.huggingface.co/nebius/v1/images/generations",

      {     response_format: "b64_json",
        prompt: AIPrompt,
        model: "stability-ai/sdxl", },

      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    //Convert to BASE 64 Image
    const responseJSON = JSON.parse(response.data)
    // console.log("from here starts the response of Model")
// console.log("Model response ",responseJSON.data[0].b64_json)
const b64ImageString = responseJSON.data[0].b64_json;
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${b64ImageString}`;
    // console.log("base64Image",base64ImageWithMime);

    //save to firebase database

    try {
        await setDoc(doc(db,"users",email,"logos",Date.now().toString()),{
            image:base64ImageWithMime,
            title:title,
            desc:desc
        })
    } catch (error) {
        
    }

    return NextResponse.json({ image: base64ImageWithMime });
    //AI Logo image model
  } catch (error: any) {
    console.error("HF API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
