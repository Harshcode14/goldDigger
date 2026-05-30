 import http from "node:http"
 import {serveStatic} from "./utils/serveStatic.js"
 import {livePrice} from "./utils/livePrice.js"
 import {processData} from "./utils/processData.js"


 const PORT=8000
 const dirname= import.meta.dirname
 const server= http.createServer(async (req,res)=>{
   
   if(!req.url.startsWith("/livePrice")){
    if (req.method==="GET")
            await serveStatic(req,res,dirname)
    else if (req.method==="POST")
      await processData(req,res)
   }
 


  else if (req.url==="/livePrice"){

    res.setHeader("Content-Type","text/event-stream")
    res.setHeader("Cache-Control","no-cache")
    res.setHeader("Connection","keep-alive")
    res.statusCode=200
    
    setInterval(()=>res.write(
      `data:${JSON.stringify({
        price: livePrice()})}\n\n`
      ),3000)
  }
  

 })
 server.listen(PORT,()=>console.log("This is from port:", PORT))