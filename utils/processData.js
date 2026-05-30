import path from "node:path"
import fs from "node:fs/promises"
import sanitizeHtml from "sanitize-html"
import {sendResponse} from "./sendResponse.js"

export async function processData(req,res){

  let body=""
  for await(let chunk of req)
 { body+=chunk}
  body= JSON.parse(body)
  
  body.invested= sanitizeHtml(body.invested,{allowedTags:[],allowedAttributes:[]})
  body.price= sanitizeHtml(body.price,{allowedTags:[],allowedAttributes:[]})

  const dataPath=path.join("data","data.json")
  let content = await fs.readFile(dataPath,"utf8")
  content=JSON.parse(content)
  
  const date=new Date()

  const data=`${date.toISOString()}, amount Paid: £${body.invested}, price per Oz: £${body.price}, gold sold: ${((+body.invested)/(+body.price)).toFixed(4)} Oz`
  content.push(data)
  await fs.writeFile(dataPath, JSON.stringify(content,null,2),"utf8")
  console.log("written successfully:", content)
  sendResponse(res,"text/html",200,JSON.stringify("Recipt Generated"))
}