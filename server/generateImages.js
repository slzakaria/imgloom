import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from 'fs'
import * as dotenv from 'dotenv';
dotenv.config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

let prompt = 'a picture of a group of husky and shiba inu , playing poker, digital art'
let number = 2
let size = '1024x1024'

const result = await openai.createImage({
  prompt,
  n: number,
  size: size,
})

//let url = result.data.data[0].url

function fetchImages(result, number) {
  let i
  let images = []
  for (i = 0; i < number; i++) {
    let url = result.data.data[i].url
    if (url.length > 0) {
      images.push(url)
    }
  }
  console.log('images', images)
  return images
}

if (result.data.data[0]) {
  console.log(`Successfuly generated ${number} IMAGES`)
  const id = Date.now()
  //save to folder
  let ais = fetchImages(result, 2)
  for (let i = 0; i < ais.length; i++) {
    console.log('saving image', i)
    let imgResult = await fetch(ais[i])
    let imgBlob = await imgResult.blob()
    let imgBuffer = Buffer.from(await imgBlob.arrayBuffer())
    writeFileSync(`./outputs/ai-${id}-${i}.png`, imgBuffer)
  }
} else {
  console.error('Failed to generate image')
}


// if (url.length > 0) {
//   console.log('Successfuly generated image')
//   //save to folder
//   const id = Date.now()
//   const imgResult = await fetch(url)
//   const imgBlob = await imgResult.blob()
//   const imgBuffer = Buffer.from(await imgBlob.arrayBuffer())
//   writeFileSync(`./outputs/${id}.png`, imgBuffer)
// } else {
//   console.error('Failed to generate image')
// }
