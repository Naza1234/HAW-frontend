


    
  fetch(`${apiUrl}/auctionWinner/${userId}`)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
       data.reverse()
       for (let i = 0; i < (data.length>3? 3 :data.length) ; i++) {
        const element = data[i];
          uploadItem(element)
       }
       document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
  }
  )
  .catch((error) => {
  console.error('Error:', error);
  });
  
  
   
function uploadItem(data){
   var container = document.getElementsByClassName("items")[0]

   var html=`
   <li>
   <img src="${data.productCoverImage}" alt="">
   <span>
       <h1>
       ${data.productName}
       </h1>

       <p>
       ${data.price}
       </p>
       <p></p>
       <span>
         <p>
         ${data.height}cm
         </p>
         <hr>
         <p>
         ${data.color}
         </p>
         <hr>
         <p>
           CM
         </p>
       </span>
   </span>
  
   <button class="runApproval">
   <h1 class="hid">${data._id}</h1>
       chart
   </button>
</li>

   
   `
   container.insertAdjacentHTML("beforeend",html)
   buttonClick()
}

function buttonClick(){
    
   var button =  document.querySelectorAll(".runApproval")
   for (let i = 0; i < button.length; i++) {
       const element = button[i];
       element.addEventListener("click",(e)=>{
           var btn=e.target
           var id=btn.getElementsByClassName("hid")[0].innerHTML
           var parent=btn.parentElement
           parent.classList.add("active_parent_to_button")
           fetchPopupData(id,parent)
       })
   }
}

function fetchPopupData(id,parent){
    document.getElementsByClassName("chart_ul")[0].innerHTML=""
    fetch(`${apiUrl}/chats/chats/${id}`)
    .then((response) => {
    return response.json();
    })
    .then((data) => {
        parent.classList.remove("active_parent_to_button")
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            populatePopup(element)
        }
    }
    )
    .catch((error) => {
    console.error('Error:', error);
    });
    
    sendMessage(id)
}

function populatePopup(data){
    var container = document.getElementsByClassName("chart_ul")[0]
     container.parentElement.parentElement.parentElement.classList.remove("hid")
     var html=`
     <li class="${data.userId===userId?"me":""}">
                   ${data.message}
            </li>
    
    `
    container.insertAdjacentHTML("beforeend",html)
}

function sendMessage(id){
    
document.getElementsByClassName("btn_send_mess")[0].addEventListener("click",()=>{
    var parent=document.getElementsByClassName("input")[0]
    parent.classList.add("active_parent_to_button")
    var input=parent.getElementsByTagName("input")[0].value
    const params={
     userId:userId,
     productId:id,
     message:input
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
     
  
      fetch(`${apiUrl}/chats/chats`, requestOptions)
      .then((response) => {
        if (response.status != 201) {
            errorIs=!errorIs
          // Handle the 400 Bad Request error
          console.error('Bad Request Error:', response);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
        fetchPopupData(id,parent)
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        
      });
 })
 
}


function remove(){
    document.getElementsByClassName("chat")[0].classList.add("hid")
}