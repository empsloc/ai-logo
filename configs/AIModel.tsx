// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const model = 'gemini-2.0-flash-lite';
const config = {
  responseMimeType: 'application/json',
};

export async function AIDesignIdea(userPrompt: string): Promise<string> {
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with decription: Indian Restaurent and refering to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field e.g. {"ideas":[ "idea 1","idea2","idea3"]}`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
{
  "ideas": [
    "Chef holding spice, smiling",
    "Spiced elephant mascot, happy",
    "Pepper character, welcoming pose",
    "Curry-loving, chef avatar",
    "Saffron dressed, character, holding naan"
  ]
}
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: userPrompt, // <-- Dynamic prompt passed by the user
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    contents,
    config,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }

  return result;
}

export async function AILogoPrompt(userPrompt: string): Promise<string> {
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate a text prompt to create Logo for Logo Title/Brand name : Indian Spice,with description:  Indian Restaurent, with Color combination of Earthy Browns, also include the {logoIdea} and include Vintage Logo Designs With Text & Icon design idea and Referring to this Logo Prompt:Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.  Give me result in JSON portal with prompt field only
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
{
  "prompt": "Create a vintage-inspired logo for \\"Indian Spice\\", an Indian Restaurant. The design should embody a hand-drawn, artistic style with a retro aesthetic.  Use a color palette of earthy browns.  The logo should include both text and an icon.  \\n\\n{logoIdea: Design a vintage-inspired logo that incorporates a hand-drawn, artistic style. Focus on bold typography with intricate details reflecting the essence of Indian cuisine. Incorporate design elements such as traditional Indian patterns (e.g., paisley), spice illustrations (e.g., cardamom pods, chili peppers, cinnamon sticks), or a stylized representation of an Indian food plate or tiffin.  Consider a circular or badge-like format for the logo.  The text \\"Indian Spice\\" should be prominently displayed using a classic, slightly distressed font.  Think of the vintage logo aesthetic with distressed elements, adding character and authenticity to the brand. \\n\\nRefer to the following vintage logo designs as inspiration: Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses. Consider options for different layouts and variations of the logo (e.g., stacked text, text around an icon, variations with and without tagline).}\\n\\nOutput Options: \\n*   The logo should be suitable for a variety of applications (e.g., restaurant signage, menu design, website, social media).\\n*   Explore multiple design variations. \\n*   Logo should be easily recognizable and memorable."
}
\`\`\`
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: userPrompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    contents,
    config,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }

  return result;
}
