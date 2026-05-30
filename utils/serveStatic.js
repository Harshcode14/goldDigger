import fs from "node:fs/promises"
import path from "node:path"
import {sendResponse} from "./sendResponse.js"
import {setContentType} from "./setContentType.js"


export async function serveStatic(req,res,dirname){

const publicPath=path.join(dirname,"public")
const filePath=path.join(
  publicPath, 
req.url==="/" ? "index.html" :req.url
)

const ext=path.extname(filePath)
const contentType=setContentType(ext)
try{
const content= await fs.readFile(filePath)
sendResponse(res,contentType,200,content)
} catch(error){
  const errorFilePath=path.join(publicPath,"404.html")
  const content= await fs.readFile(errorFilePath)
  sendResponse(res,"text/html",200,content)
}


}