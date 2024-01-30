




var form=document.getElementsByTagName("form")[0]

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    var input=form.getElementsByTagName("input")
    const params={
      name:input[0].value,
      email:input[1].value,
      phoneNo:input[2].value,
      company:input[3].value,
      message:form.getElementsByTagName("textarea")[0].value
    }

     form.classList.add("active_parent_to_button")
     
     const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
      var errorIs=false
  
      fetch(`${apiUrl}/contactUs/contactUs`, requestOptions)
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
           document.getElementsByTagName("h6")[0].classList.add("error")
           document.getElementsByTagName("h6")[0].innerHTML=data.message
           setTimeout(() => {
            document.getElementsByTagName("h6")[0].classList.remove("error")
            document.getElementsByTagName("h6")[0].innerHTML = ""
           }, 10000);
        }else{
            localStorage.setItem("HAWebsiteUserKey",data)
            window.location=winUrl
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        document.getElementsByTagName("h6")[0].classList.add("error")
        document.getElementsByTagName("h6")[0].innerHTML = error
        form.classList.remove("active_parent_to_button")
        setTimeout(() => {
         document.getElementsByTagName("h6")[0].classList.remove("error")
         document.getElementsByTagName("h6")[0].innerHTML = ""
        }, 10000);
      });
  
})