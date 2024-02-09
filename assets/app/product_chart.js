const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("r")



if (!itemId) {
    window.location=winUrl
}




fetch(`${apiUrl}/products/products/${itemId}`)
.then((response) => {
return response.json();
})
.then((data) => {
    uploadItem(data)
    document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
    sendMessage(itemId)
}
)
.catch((error) => {
console.error('Error:', error);
});




function uploadItem(data){
    var container = document.getElementsByClassName("auction_room")[0]
 
    var html=`
    <section class="top">
    <img src="${data.productCoverImage}" alt="">
    <div class="content">
      <h1>
      ${data.productName} 
      </h1>
      <p>
        starting price
      </p>
      <h2>
        $  ${data.price}
      </h2>
      <span>
        <h1>
        ${data.years} Y/O
        </h1>
        <hr>
        <h1>
        ${data.height}cm
        </h1>
        <hr>
        <h1>
        ${data.color}
        </h1>
      </span>
      <div class="bids">
        <div class="bid_scroll">
          <ul class="chart_ul">
           
          </ul>
        </div>
        <span class="input">
          <input type="text">
          <button class="runApproval_btn">
            send
          </button>
        </span>
      </div>
    </div>
  </section>
    `
    container.innerHTML=html
  
    fetchPopupData(itemId,document.getElementsByClassName("auction_room")[0])
 }


 function buttonClick(){
    
    var button =  document.querySelectorAll(".runApproval_btn")
    for (let i = 0; i < button.length; i++) {
        const element = button[i];
        element.addEventListener("click",(e)=>{
            var btn=e.target
            document.getElementsByClassName("auction_room")[0].classList.add("active_parent_to_button")
              
            sendMessage(itemId)
          
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
        document.getElementsByClassName("auction_room")[0].classList.remove("active_parent_to_button")
    }
    )
    .catch((error) => {
    console.error('Error:', error);
    });
  
  }
  
  function populatePopup(data){
    var container = document.getElementsByClassName("chart_ul")[0]
     var html=`
     <li class="${data.userId===userId?"me":""}">
                   ${data.message}
            </li>
    
    `
    container.insertAdjacentHTML("beforeend",html)
  }


  function sendMessage(id){
    
    document.getElementsByClassName("runApproval_btn")[0].addEventListener("click",()=>{
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
            fetchPopupData(id,document.getElementsByClassName("auction_room")[0])
            document.getElementsByClassName("auction_room")[0].classList.remove("active_parent_to_button")
          })
          .catch((error) => {
            // Handle any errors
            console.error('Error:', error);
            
          });
     })
     
    }
    
    