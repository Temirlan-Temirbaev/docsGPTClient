import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
type ResponseData = {
  text : string
}
interface GenerateNextApiRequest extends NextApiRequest{
  body : {
    prompt : string;
  }
}
const config = new Configuration({
  apiKey : process.env.NEXT_PUBLIC_CHATGPT_KEY
})
const openai = new OpenAIApi(config);
export default async function handler(req : GenerateNextApiRequest, res : NextApiResponse){
  const prompt  = req.body.prompt;
  if (!prompt || prompt === ''){
    return new Response('Пожалуйста отправьте промпт', {status : 400})
  }
  const aiResult = await openai.createCompletion({
    model : 'text-davinci-003',
    prompt : `${prompt}`,
    temperature : 0.2,
    max_tokens : 2048,
    frequency_penalty : 0.5,
    presence_penalty : 0
  })
  console.log(prompt);
  console.log(aiResult.data.choices[0]);
  
  const response = aiResult.data.choices[0].text?.trim() || "Извините, но на данный момент все сервера перегружены"
  res.status(200).json({text : response})
}
