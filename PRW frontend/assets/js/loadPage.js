
goSeeDetails()
search()
function goSeeDetails() {
    var items = document.querySelectorAll(".property-list .items");
    if (items.length === 0) {
        // If imageParent doesn't exist, call the function again after 5 seconds
        console.log("yes");
        setTimeout(goSeeDetails, 5000); // 5000 milliseconds = 5 seconds
        return; // Exit the function to avoid further execution
    }
    
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        var idElement = element.getElementsByClassName("hid")[0];
        if (idElement) {
            var id = idElement.textContent.trim();
            element.addEventListener("click", () => {
                window.location = `${winUrl}/details.html?r=${id}`;
            });
        } else {
            console.error("Error: hid element not found in items element.");
        }
    }
}


function search(){
    var item = document.querySelector(".header-bottom-actions button.header-bottom-actions-btn")
    console.log(item);
    if(item){
       item.addEventListener("click",()=>{
        window.location=`${winUrl}/search.html`
       })
    }
}