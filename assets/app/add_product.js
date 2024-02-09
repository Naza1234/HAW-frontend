




const form = document.getElementsByTagName("form")
var inputs = document.getElementsByTagName("input")

console.log(inputs);
form[0].addEventListener("submit",(e)=>{
    e.preventDefault()
    inputs = document.getElementsByTagName("input")
    form[0].classList.add("active_parent_to_button")
     
    const formData= new FormData()
      formData.append("userId","65b870c2586e9c4fa24c6961")
      formData.append("name",inputs[0].value)
      formData.append("height",inputs[1].value)
      formData.append("color",inputs[2].value)
      formData.append("years",inputs[3].value)
      formData.append("noOf$",inputs[4].value)
      formData.append("price",inputs[5].value)
      formData.append("startDATE",inputs[6].value+ " " + inputs[7].value)
      formData.append("endDate",inputs[8].value+ " " + inputs[9].value)
      formData.append("Image",inputs[10].files[0])
      
      const requestOptions = {
        method: 'POST',
         body: formData,
      };
      var errorIs=false


      fetch(`${apiUrl}/products/products`, requestOptions)
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
        if (errorIs) {
           
        }else{
           uploadImg(data)
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
})

})



// Assuming you have an array to store the selected files
const selectedFiles = [];


// Function to update image previews
function updateImagePreviews() {
    const imagePreviews = document.getElementsByClassName('imagePreviews');
    const ImageContainer=document.getElementsByClassName("image")[0]
    ImageContainer.innerHTML=""

    for (let i = 0; i < selectedFiles.length; i++) {
        if (i >= 7) {
            break; // Display up to 5 images only
        }
       
        const imageSrc = URL.createObjectURL(selectedFiles[i]);
        var html=` <img src="${imageSrc}" alt="" >`
        ImageContainer.insertAdjacentHTML('beforeend',html)
    }
}



function uploadImg(id){
    form[0].parentElement.parentElement.classList.add("hid")
    form[1].parentElement.parentElement.classList.remove("hid")
    var h1=document.querySelectorAll(".add_products .nav h1")
    var hr=document.querySelectorAll(".add_products .nav hr")
    h1[0].classList.remove("active")
    h1[1].classList.add("active")
    hr[0].classList.add("active")
    hr[1].classList.add("active")




    inputs[11].addEventListener("change",(e)=>{
        const newFiles = e.target.files;
            // Clear the previously selected files if needed
    if (selectedFiles.length === 7) {
        selectedFiles.pop(); // Remove the oldest file
    }

    // Add the new files to the selectedFiles array
    for (const file of newFiles) {
        selectedFiles.unshift(file); // Add to the beginning of the array
    }

    // Update image previews with the latest selections
    updateImagePreviews();
    })

    
    form[1].addEventListener("submit", (e) => {
      e.preventDefault();
      form[1].classList.add("active_parent_to_button");

      // Create an array to store all fetch promises
      const fetchPromises = [];

      for (let i = 0; i < selectedFiles.length; i++) {
          const element = selectedFiles[i];

          const formData = new FormData()
          formData.append("Image", element)

          const requestOptions = {
              method: 'POST',
              body: formData,
          };

          // Push the fetch promise into the array
          fetchPromises.push(
              fetch(`${apiUrl}/productImage/products/images/${id}`, requestOptions)
                  .then((response) => response.json())
                  .then((data) => {
                      // Handle the response data here
                  })
                  .catch((error) => {
                      // Handle any errors
                      console.error('Error:', error);
                  })
          );
      }

      // Wait for all fetch requests to complete
      Promise.all(fetchPromises)
          .then(() => {
              // All fetch requests are completed
              uploadVideo(id);
          });
  });
}








const selectedVideoFiles=[]



// Function to update video previews
function updateVideoPreviews() {
    const ImageContainer=document.getElementsByClassName("image")[1]
    ImageContainer.innerHTML=""

    for (let i = 0; i < selectedVideoFiles.length; i++) {
        if (i >= 10) {
            break; // Display up to 5 images only
        }
        console.log(selectedVideoFiles[i]);
        const imageSrc = URL.createObjectURL(selectedVideoFiles[i].videoUrl);
        var html=` 
        <span>
        <video src="${imageSrc}" controls preload="auto"></video>
        <h4>
          ${selectedVideoFiles[i].name}
        </h4>
      </span>
        `
        ImageContainer.insertAdjacentHTML('beforeend',html)
    }
}



function uploadVideo(id){
    form[1].parentElement.parentElement.classList.add("hid")
    form[2].parentElement.parentElement.classList.remove("hid")
    var h1=document.querySelectorAll(".add_products .nav h1")
    var hr=document.querySelectorAll(".add_products .nav hr")
    h1[1].classList.remove("active")
    h1[2].classList.add("active")
    hr[0].classList.remove("active")
    hr[1].classList.add("active")
    
     

    document.getElementsByClassName("addit")[0].addEventListener("click",()=>{
       if (inputs[12].value && inputs[13].files[0]) {
                  // Clear the previously selected files if needed
         if (selectedVideoFiles.length === 10) {
        selectedVideoFiles.pop(); // Remove the oldest file
        }

        const params={
            productId:id,
            name:inputs[12].value,
            videoUrl:inputs[13].files[0],
        }
        selectedVideoFiles.unshift(params); // Add to the beginning of the array

       }
        
       
   
    // Update image previews with the latest selections
    updateVideoPreviews();




    })



form[2].addEventListener("submit",(e)=>{
        e.preventDefault()
        form[2].classList.add("active_parent_to_button")
        for (let i = 0; i < selectedVideoFiles.length; i++) {
            const element = selectedVideoFiles[i];
            


            const formData= new FormData()
            formData.append("productId",id) 
            formData.append("name",element.name) 
            formData.append("video",element.videoUrl) 
         
            const requestOptions = {
              method: 'POST',
               body: formData,
            };
            var errorIs=false
      
      
            fetch(`${apiUrl}/videos/videos`, requestOptions)
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
              if (errorIs) {
                 
              }else{
                if (selectedVideoFiles[i] === selectedVideoFiles.length-1) {
                   window.location=window.location   
                  }
            
                
              }
            })
            .catch((error) => {
              // Handle any errors
              console.error('Error:', error);
      })



      if (selectedFiles[i] === selectedFiles.length-1) {
        uploadVideo(id)
      }

        }
    })


}