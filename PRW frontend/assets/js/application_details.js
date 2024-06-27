const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("r")

 console.log(itemId);

var productId

 
fetch(`${apiUrl}/application/applications/${itemId}`)
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
})
.then(data => {
 productId=data.productId
  console.log(data);






  const containerList = document.getElementById('application_details');

  for (const [key, value] of Object.entries(data)) {
    
    var newHtml = `<li>
    ${key} : <b>${value}</b>
    </li>`;
    containerList.insertAdjacentHTML("beforeend",newHtml);
  }


  highlightImageElements()

  newPage()








  




fetch(`${apiUrl}/property/${productId}`)
.then(response => response.json())
.then(data => {
  console.log(data);
  populateDate(data)
})
.catch(error => console.error('Error:', error));

fetch(`${apiUrl}/coverImage/${productId}`)
    .then(response => response.json())
    .then((coverImg) => {
        console.log(coverImg); // Added missing closing parenthesis

        fetch(`${apiUrl}/otherImage/by-id/${productId}`)
            .then(response => response.json())
            .then(otherImg => {
                console.log(otherImg);
                populateImage(coverImg, otherImg);
            })
            .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));










})
.catch(error => console.error('Error:', error));










function highlightImageElements() {
    const liElements = document.querySelectorAll('#application_details li');
    liElements.forEach(li => {
      const bElement = li.querySelector('b');
      if (bElement.innerHTML.includes('image')) {
        console.log(li);
        console.log("li");
        li.classList.add('highlight');
      }
    });
  }

  function newPage() {
    const liElements = document.querySelectorAll('.highlight');
    liElements.forEach(li => {
      li.addEventListener("click", () => {
        const bElement = li.querySelector('b').innerHTML.toLowerCase();
        const url = `${apiUrl}/${bElement}`; // Corrected the URL interpolation
        window.location.href = url;
      });
    });
  }
  







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



     