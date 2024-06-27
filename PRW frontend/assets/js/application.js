fetch(`${apiUrl}/application/applications`)
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
})
.then(data => {
  data.reverse();
  console.log(data);
  data.forEach(element => {
    populateData(element);
  });
})
.catch(error => console.error('Error:', error));

function populateData(data) {
const container = document.querySelector(".application_list_ul");
const html = `
  <li>
  <p class="hid" >${data._id}</p>
    <span>${new Date(data.createdAt).toLocaleDateString()}</span>
    <h1>Applicant Name: <b>${data.first_name} ${data.last_name}</b></h1>
    <h1>Applicant Email: <b>${data.email || "not available"}</b></h1>
    <h1>Applicant Phone: <b>${data.phone_number}</b></h1>
  </li>
`;
container.insertAdjacentHTML("beforeend", html);
}




// application detals.html



goSeeDetails()

function goSeeDetails() {
    var items = document.querySelectorAll(".application_list_ul li");
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
                window.location = `${winUrl}/admine-pages/application detals.html?r=${id}`;
            });
        } else {
            console.error("Error: hid element not found in items element.");
        }
    }
}
