export function livePrice(){
  const sign= (Math.random())>0.5 ?1:-1
  let price =10000+(Math.floor(Math.random()*50))*sign
  return price
}