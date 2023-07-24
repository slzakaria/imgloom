import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
dotenv.config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

let prompt = ''
let response = await openai.createCompletion(
  {
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 0,
    temperature: 0,
  }
)

console.log(response.data.choices[0])