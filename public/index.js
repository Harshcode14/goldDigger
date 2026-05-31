const eventSource= new EventSource("/livePrice")

const priceDisplay=document.getElementById("price-display")
const modalEl=document.getElementById("modal")
const dialog = document.querySelector("dialog"); 
let amount
let livePrice


eventSource.onmessage=(event)=>{
  document.getElementById("connection-status").textContent="Live Price 🟢"
  document.getElementById("invest-btn").disabled=false
const data=JSON.parse(event.data)
priceDisplay.textContent= " " +data.price
}
eventSource.onerror=(err)=>{
console.log(err)
document.getElementById("connection-status").textContent="Disconnected 🔴"
priceDisplay.textContent="----.--"
document.getElementById("invest-btn").disabled=true
}

document.querySelector("form").addEventListener("submit", function(e){
e.preventDefault()
amount=+(priceDisplay.textContent)
livePrice=+(document.getElementById("investment-amount").value)
  const data={
    price:  livePrice,
    invested:  amount
  }
  fetch("/",{method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(data)
  })
  .then(res=>res.text())
  .then(data=>console.log(data))
  dialog.showModal();
  document.getElementById("amount").textContent=(livePrice/amount).toFixed(2)
  document.getElementById("price").textContent=livePrice
  // .catch(error=>console.log(error))
})
document.getElementById("close-modal").addEventListener("click",function(){
// dialog.close()
window.location.reload()
})