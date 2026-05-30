const eventSource= new EventSource("/livePrice")

const priceDisplay=document.getElementById("price-display")

eventSource.onmessage=(event)=>{
const data=JSON.parse(event.data)
priceDisplay.textContent= " " +data.price
}

document.querySelector("form").addEventListener("submit", function(e){
e.preventDefault()
  const data={
    price: priceDisplay.textContent,
    invested:  document.getElementById("investment-amount").value
  }
  fetch("/",{method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(data)
  })
  .then(res=>res.text())
  .then(data=>console.log(data))
  // .catch(error=>console.log(error))
})