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
          if(formattedDateTime>element.AuctionEndDate && element.AuctionStartDate < formattedDateTime){
            uploadItem(element,0)
          }
          if(formattedDateTime>element.AuctionStartDate){
            uploadItem(element,1)
          }
       }
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
     <button class="bid">
     <h1 class="hid">${data._id}</h1>
       Bid
     </button>
      
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
            var id=btn.getElementsByClassName("hid")[0].innerHTML
            window.location=`${winUrl}/page/auction-room.html?r=${id}`
        })
    }
}