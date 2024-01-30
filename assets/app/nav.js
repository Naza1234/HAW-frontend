winUrl="https://equiauction.space"
apiUrl="https://haw-server.onrender.com"

const userId=localStorage.getItem("HAWebsiteUserKey")
if (userId) {
    document.getElementsByClassName("bugger")[0].innerHTML=`
    <a href="${winUrl}/page/cart.html">
    <button class="login">
        <h1>cart</h1>
    </button>
  </a>
  <div class="bugger_lines">
    <hr class="line1">
    <hr class="line2">
    <hr class="line3">
  </div>
    `

    fetch(`${apiUrl}/user/users/${userId}`)
.then((response) => {
return response.json();
})
.then((data) => {
    if (data.UserIsAdmin) {      
        var container = document.getElementsByClassName("nav_links")[0]
    
        var html=`
                <select>
                <a href="#"><li>  <option value="">admin pages</option> </li></a>
                <a href="#"><li>  <option value="add_horse.html">Add a new hose </option> </li></a>
                <a href="#"><li>  <option value="contactInfor.html">Messages</option> </li></a>
                <a href="#"><li>  <option value="AllproductForAdmin.html">products</option> </li></a>
                
                </select>
        
        `
        container.insertAdjacentHTML("beforeend",html)
    }


    var selectionNav = document.querySelector(".nav_links select");

selectionNav.addEventListener("change", () => {
    if (selectionNav.value != "") {
        window.location=`${winUrl}/page/${selectionNav.value}`
    }
});


}
)
.catch((error) => {
console.error('Error:', error);
});







}



document.getElementsByClassName("bugger_lines")[0].addEventListener("click",()=>{
    document.getElementsByClassName("bugger_lines")[0].classList.toggle("bugger-out")
    document.getElementsByClassName("nav_links")[0].classList.toggle("nav_links_out")
})






