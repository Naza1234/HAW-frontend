

var form=document.getElementsByTagName("form")[0]

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    var input=form.getElementsByTagName("input")
    const params={
        UserName:input[0].value,
        UserMobile:input[1].value,
        UserCompany:input[2].value,
        UserEmail:input[3].value,
        UserPassword:input[4].value
    }
    if(input[4].value === input[5].value){
     form.classList.add("active_parent_to_button")
     
     const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
      var errorIs=false
  
      fetch(`${apiUrl}/user/users/signUp`, requestOptions)
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
    }else{
        document.getElementsByTagName("h6")[0].classList.add("error")
        document.getElementsByTagName("h6")[0].innerText="password and confirm password must tally"
        setTimeout(() => {
           document.getElementsByTagName("h6")[0].classList.remove("error")
           document.getElementsByTagName("h6")[0].innerText=""
        }, 10000);
    }
})