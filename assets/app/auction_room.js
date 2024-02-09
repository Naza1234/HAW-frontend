const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("r")

 var value

if (!itemId) {
    window.location=winUrl
}

if (!userId) {
  window.location=winUrl
}



fetch(`${apiUrl}/products/products/${itemId}`)
.then((response) => {
return response.json();
})
.then((data) => {
    uploadItem(data)
    value=data.price
    document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
}
)
.catch((error) => {
console.error('Error:', error);
});






function uploadItem(data){
    var container = document.getElementsByClassName("top")[0]
 
    var html=`
 
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
          <input type="number">
          <button class="runApproval_btn">
            send
          </button>
        </span>
      </div>
    </div>

    `
    container.innerHTML=html
    // buttonClick()
    sendMessage(itemId)
    fetchPopupData(itemId,document.getElementsByClassName("auction_room")[0])
 }

 function buttonClick(){
    
    var button =  document.querySelectorAll(".runApproval_btn")[0]
  
        button.addEventListener("click",(e)=>{
            // var btn=e.target
            // document.getElementsByClassName("auction_room")[0].classList.add("active_parent_to_button")
            
        })
  
 }


function sendAuction(amount){
   const params={
    userId:userId,
  amount:amount,
  productId:itemId
   }
       
    
   const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
     body: JSON.stringify(params),
  };


  fetch(`${apiUrl}/auction/auctions`, requestOptions)
  .then((response) => {
  
    return response.json();
  })
  .then((data) => {
    fetchPopupData(itemId,document.getElementsByClassName("auction_room")[0])
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  
  });
}







 function fetchPopupData(id,parent){
   fetch(`${apiUrl}/auction/auctions/byId/${id}`)
   .then((response) => {
     return response.json();
    })
    .then((data) => {
      parent.classList.remove("active_parent_to_button")
      document.getElementsByClassName("chart_ul")[0].innerHTML=""
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            populatePopup(element)
        }
      if (data.length>0) {
        value=data[data.length-1].amount
      }
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
                   ${data.amount}
            </li>
    
    `
    container.insertAdjacentHTML("beforeend",html)
  }


  function sendMessage(id){
    
    document.getElementsByClassName("runApproval_btn")[0].addEventListener("click",()=>{
        var parent=document.getElementsByClassName("input")[0]
        var input=parent.getElementsByTagName("input")[0].value
        if(input>value){
          parent.classList.add("active_parent_to_button")
            const params={
             userId:userId,
             productId:id,
             amount:input
            }
        
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                 body: JSON.stringify(params),
              };
             
          
              fetch(`${apiUrl}/auction/auctions`, requestOptions)
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
              })
              .catch((error) => {
                // Handle any errors
                console.error('Error:', error);
                
              });
        }
     })
     
    }
    



    fetch(`${apiUrl}/videos/products/videos/${itemId}`)
    .then((response) => {
    return response.json();
    })
    .then((data) => {
       for (let i = 0; i < data.length; i++) {
        const element = data[i];
        uploadVideo(element)
       }
    }
    )
    .catch((error) => {
    console.error('Error:', error);
    });
    

    function uploadVideo(data){
        var container = document.getElementsByClassName("video_items")[0]

        var html=`
        <span>
        <video src="${data.videoUrl}" controls>
        </video>
        <h1>
          ${data.name}
        </h1>
      </span>
        `
        container.insertAdjacentHTML("beforeend",html)
    }




    fetch(`${apiUrl}/productImage/products/images/${itemId}`)
    .then((response) => {
    return response.json();
    })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            uploadImage(element)
           }
    }
    )
    .catch((error) => {
    console.error('Error:', error);
    });
    


    
    function uploadImage(data){
        var container = document.getElementsByClassName("images_items")[0]

        var html=`
        <img src="${data.imageUrl}" alt="">
        `
        container.insertAdjacentHTML("beforeend",html)
    }