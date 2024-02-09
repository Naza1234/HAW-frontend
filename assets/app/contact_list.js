   
  fetch(`${apiUrl}/contactUs/contactUs`)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
       for (let i = 0; i < data.length ; i++) {
        const element = data[i]
          uploadItem(element)
       }
       
       document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
  }
  )
  .catch((error) => {
  console.error('Error:', error);
  });
  
  
   
function uploadItem(data){
   var container = document.getElementsByClassName("contact_list")[0]

   var html=`
            <li class="li">
              <h4>
                ${data.createdAt}
              </h4>
              <h1>
                <b>name</b>
                ${data.name}
              </h1>
              <h1>
                <b>email</b>
                ${data.phoneNo}
              </h1>
             <div>
              <h1>
                <b>Phone No</b>
                ${data.company}
              </h1>
              <h1>
                <b>Company</b>
                ${data.email}
              </h1>
              <h1>
                <b>
                  message
                </b>
              </h1>
              <textarea>
              ${data.message}
              </textarea>
              
             </div>
            </li>
   
   `
   container.insertAdjacentHTML("beforeend",html)
   buttonClick()
}




function buttonClick(){
   var button =  document.querySelectorAll(".contact_list li")
   for (let i = 0; i < button.length; i++) {
       const element = button[i];
       element.addEventListener("click",(e)=>{
        for (let i = 0; i < button.length; i++) {
            const element = button[i];
            element.classList.remove("active")
        }
           element.classList.toggle("active")
       })
   }
}