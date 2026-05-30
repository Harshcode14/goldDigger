
export function sendResponse(res,contentType,statusCode,content){
  res.setHeader("Content-Type", contentType)
  res.statusCode=statusCode
  res.end(content)
}