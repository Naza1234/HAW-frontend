

const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("r")

 console.log(itemId);

 var type

 
fetch(`${apiUrl}/property/${itemId}`)
.then(response => response.json())
.then(data => {
  console.log(data);
  populateDate(data)
})
.catch(error => console.error('Error:', error));

fetch(`${apiUrl}/coverImage/${itemId}`)
    .then(response => response.json())
    .then((coverImg) => {
        console.log(coverImg); // Added missing closing parenthesis

        fetch(`${apiUrl}/otherImage/by-id/${itemId}`)
            .then(response => response.json())
            .then(otherImg => {
                console.log(otherImg);
                populateImage(coverImg, otherImg);
                document.getElementsByClassName("loading_body")[0].classList.add("hid")
            })
            .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));




fetch(`${apiUrl}/property?limit=20&sortBy=date:desc`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the data
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.Chart === type) {
              showDate(0,element)
            }
          }
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });



fetch(`${apiUrl}/coverImage?limit=20&sortBy=date:desc`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the data
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            populateImageTwo(element)
          }
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });






function populateDate(data){
    type =data.Chart
    var html= `
    <section class="dets">
    <h1>
    <strong>$${data.Price}</strong>/Month
    </h1>
    <h2>
    ${data.Name}
    </h2>
    
    <p>
    ${data.Details}
    </p>
    <p class="card-badge green ${data.for === "rentals"?"green":"orange"}" style="position: static; top: unset; left: unset; right: unset; color: #fff;">${data.for}</p>
    <section style="${data.Chart === "car" ? "opacity: 0;" : ""}">
    <div>
    <span>
    <strong>${data.Bedrooms}</strong>
          <br>

            <ion-icon name="bed-outline"></ion-icon>
        </span>
        Bedrooms
     </div>
<hr>

     <div>
        <span>
        <strong>${data.Bathrooms}</strong>
        <br>

            <ion-icon name="man-outline"></ion-icon>
        </span>
       bathroom
     </div>
<hr>
     <div>
        <span>
        <strong>${data.squareFit}</strong>
         <br>

            <ion-icon name="square-outline"></ion-icon>
        </span>
        square-fit
     </div>
    </section>
         </section>



<div class="map">
   ${data.LocationMap}
</div>
    `

    document.getElementsByClassName("sub-det")[0].innerHTML=html
}


function populateImage(coverImg,otherImg){
    console.log("runing");
    var html=`
    <img src="${coverImg.ImageUrl}" alt="" class="main-img">
    <div>
        <img src="${otherImg[0].ImageUrl}" alt="" class="item-img">
        <img src="${otherImg[1].ImageUrl}" alt="" class="item-img">
        <img src="${otherImg[2].ImageUrl}" alt="" class="item-img">
        <img src="${otherImg[3].ImageUrl}" alt="" class="item-img">
        <img src="${otherImg[4].ImageUrl}" alt="" class="item-img">
        <img src="${otherImg[5].ImageUrl}" alt="" class="item-img">
    </div>
    `
    document.getElementsByClassName("top")[0].innerHTML=html
    runImage()
}


function runImage() {
    var coverImg = document.getElementsByClassName("main-img")[0];
    var otherImg = document.getElementsByClassName("item-img");

    // Loop through all otherImg elements
    for (let i = 0; i < otherImg.length; i++) {
        otherImg[i].addEventListener("click", function () {
            // Extract the src of the clicked otherImg
            var clickedImgSrc = this.src;

            // Exchange src between coverImg and clicked otherImg
            var tempSrc = coverImg.src;
            coverImg.src = clickedImgSrc;
            this.src = tempSrc;
        });
    }
}



    function showDate(No,data){
        const container = document.querySelectorAll(" .property-list")[No]
        var html=`
          
        <li class="items">
     
        <div class="property-card">
         <p class="hid">${data._id}</p>
          <figure class="card-banner">
     
            
              <img src="" alt="" class="w-100 item-image-cover">
           
     
            <div class="card-badge green ${data.for === "rentals"?"green":"orange"}">${data.for}</div>
     
            <div class="banner-actions">
     
              <button class="banner-actions-btn">
                <ion-icon name="location"></ion-icon>
     
                <address>${data.LocationName}</address>
              </button>
           
            </div>
     
          </figure>
     
          <div class="card-content">
     
            <div class="card-price">
              <strong>$${data.Price}</strong>/Month
            </div>
     
            <h3 class="h3 card-title">
              <a href="#">${data.Name}</a>
            </h3>
     
            <p class="card-text">
             ${data.Details}
            </p>
     
            <ul class="card-list" style="${data.Chart === "car" ? "opacity: 0;" : ""}">
     
     
              <li class="card-item">
                <strong>${data.Bedrooms}</strong>
     
                <ion-icon name="bed-outline"></ion-icon>
     
                <span>Bedrooms</span>
              </li>
     
              <li class="card-item">
                <strong>${data.Bathrooms}</strong>
     
                <ion-icon name="man-outline"></ion-icon>
     
                <span>Bathrooms</span>
              </li>
     
              <li class="card-item">
                <strong>${data.squareFit}</strong>
     
                <ion-icon name="square-outline"></ion-icon>
     
                <span>Square Ft</span>
              </li>
     
            </ul>
     
          </div>
     
          <div class="card-footer">
     
            <div class="card-author">
     
              <figure class="author-avatar">
                <img src="./assets/images/customer-service.png" alt="contact" class="w-100">
              </figure>
     
              <div>
                <p class="author-name">
                  <a href="#">William Seklo</a>
                </p>
     
                <p class="author-title">Estate Agents</p>
              </div>
     
            </div>
     
            <!-- <div class="card-footer-actions">
     
              <button class="card-footer-actions-btn">
                <ion-icon name="resize-outline"></ion-icon>
              </button>
     
              <button class="card-footer-actions-btn">
                <ion-icon name="heart-outline"></ion-icon>
              </button>
     
              <button class="card-footer-actions-btn">
                <ion-icon name="add-circle-outline"></ion-icon>
              </button>
     
            </div> -->
     
          </div>
     
        </div>
      </li>
     
        `
        container.insertAdjacentHTML("beforeend",html)
     }
     
     
     
     function populateImageTwo(data) {
       var imageParent = document.querySelectorAll(".property-list .items");
       for (let i = 0; i < imageParent.length; i++) {
           const element = imageParent[i];
           var idElement = element.getElementsByClassName("hid")[0];
           if (idElement) {
               var id = idElement.textContent.trim();
               if (id === data.PropertyId) {
                   var imageElement = element.getElementsByClassName("item-image-cover")[0];
                   if (imageElement) {
                       imageElement.src = data.ImageUrl;
                       // Add style to unset the display property
                       element.style.display = "unset";
                       return; // Optimization: Stop looping once the image is updated
                   }
               }
           }
       }
     }