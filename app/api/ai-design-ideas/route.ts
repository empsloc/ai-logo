import { AIDesignIdea } from "@/configs/AIModel"
import { error } from "console"
import { NextResponse } from "next/server"

export async function POST(req:any) {
    const {prompt} = await req.json()
    try {
        const result = await AIDesignIdea(prompt)
        return NextResponse.json(JSON.parse(result))
    } catch (e) {
        return NextResponse.json({error:e})
        
    }
}