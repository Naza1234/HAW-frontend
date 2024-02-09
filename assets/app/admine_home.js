const currentDate = new Date();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;



console.log(document.getElementsByClassName("items")[0]);

    
  fetch(`${apiUrl}/products/products`)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
       data.reverse()
       for (let i = 0; i < data.length ; i++) {
        const element = data[i];
            uploadItem(element,0)
          
       }
       document.getElementsByClassName("product_length")[0].getElementsByClassName("p_no")[0].innerHTML=`
       ${data.length} <b>/pro
       </b>
       `
       document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
  }
  )
  .catch((error) => {
  console.error('Error:', error);
  });
  
  
   
function uploadItem(data,noOfDiv){
   var container = document.getElementsByClassName("items")[noOfDiv]

   var html=`
   <div class="item">
   <img src=" ${data.productCoverImage}" alt="" class="item_img">
   <div class="indicator">
       ${data.noOf$}
   </div>
   <div class="details">
     <h1>
     ${data.productName}
     </h1>
     <h1>
     ${data.price}
     </h1>
     <button class="bid"><h1 class="hid">${data._id}</h1><h1 class="hid">${data.AuctionStartDate}</h1><h1 class="hid">${data.AuctionEndDate}</h1>${formattedDateTime>data.AuctionEndDate && data.ownersId === "loading..."?"find winner": formattedDateTime<data.AuctionEndDate ? "Auction In Progress":formattedDateTime<data.AuctionStartDate ?"Auction Yet To Start":"details"}</button>
      
    <div class="sub_dit">
       <span>
       ${data.years} Y/O
       </span>
       <hr>
       <span>
       ${data.height}cm
       </span>
       <hr>
       <span>
       ${data.color}
       </span>
    </div>
   </div>
</div>
   
   `
   container.insertAdjacentHTML("beforeend",html)
   buttonClick()
}



function buttonClick(){
    var button =  document.querySelectorAll(".item .bid")
    for (let i = 0; i < button.length; i++) {
        const element = button[i];
        element.addEventListener("click",(e)=>{
            var btn=e.target
            var content=btn.innerHTML
            var id=btn.getElementsByClassName("hid")[0].innerHTML
            if (content.includes("find winner")) {  
                findWinner(id);
            }else{
                window.location=`${winUrl}/page/productDetails.html?r=${id}`
            }
            // window.location=`${winUrl}/page/auction-room.html?r=${id}`
        })
    }
      

    var items=document.querySelectorAll(".item")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        var item=element.getElementsByClassName("hid")
        if (formattedDateTime>item[2].innerHTML) {
          element.classList.remove("hid")
        }else{
          element.classList.add("hid")
        }
    }
}



var buttons =document.querySelectorAll(".quick_nav span")


    buttons[0].addEventListener("click",()=>{
     document.getElementsByClassName("quick_nav")[0].classList.add("active")
     document.getElementsByClassName("quick_nav")[0].classList.remove("explore")
     var items=document.querySelectorAll(".item")
  for (let i = 0; i < items.length; i++) {
      const element = items[i];
      var item=element.getElementsByClassName("hid")
      if (formattedDateTime>item[2].innerHTML) {
        element.classList.remove("hid")
      }else{
        element.classList.add("hid")
      }
  }
    })
    buttons[1].addEventListener("click",()=>{
        document.getElementsByClassName("quick_nav")[0].classList.remove("active")
     document.getElementsByClassName("quick_nav")[0].classList.add("explore")
     var items=document.querySelectorAll(".item")
  for (let i = 0; i < items.length; i++) {
      const element = items[i];
      var item=element.getElementsByClassName("hid")
      if (formattedDateTime>item[2].innerHTML) {
        element.classList.add("hid")
      }else{
        element.classList.remove("hid")
      }
  }
    })


    function findWinner(id){
        console.log(id);
        fetch(`${apiUrl}/auctionWinner/find-winner/${id}`)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
           console.log(data);
        }
        )
        .catch((error) => {
        console.error('Error:', error);
        });
    }