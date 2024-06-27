const inputImage = document.getElementsByTagName("input");
const imageCovers = document.getElementsByClassName("img-uploded");


for (let i = 0; i < inputImage.length; i++) {
    inputImage[i].addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            // Check if imageCovers[i] exists before setting its src
            if (imageCovers[i]) {
                imageCovers[i].src = reader.result;
            } else {
                console.error("Element imageCovers[" + i + "] is undefined.");
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
}


const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementsByTagName("input");
    const otherImages = [];
    document.querySelector(".add-products button").classList.add("active")
    for (let i = 1; i < inputImage.length; i++) {
        if (input[i].type === "file" && input[i].files[0]) {
            otherImages.push({
                imageUrl: input[i].files[0]
            });
        }
    }

    const productDetail = {
        Price: input[8].value,
        Name: input[7].value,
        Details: document.getElementsByTagName("textarea")[0].value,
        Bedrooms: input[9].value,
        Bathrooms: input[10].value,
        squareFit: input[11].value, // Corrected index
        for: document.getElementsByTagName("select")[0].value, // Corrected property name
        Chart: document.getElementsByTagName("select")[1].value,// Corrected property name
        LocationName: input[12].value,
        LocationMap: input[13].value,
    };

    const requestForProductDetails = {
        method: 'POST',
        body: JSON.stringify(productDetail),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(`${apiUrl}/property`, requestForProductDetails)
        .then(response => response.json())
        .then(data => {
            const promises = [];

            otherImages.forEach(image => {
                const formData = new FormData();
                formData.append("PropertyId", data._id);
                formData.append("imageUrl", image.imageUrl);

                const requestForOtherImage = {
                    method: 'POST',
                    body: formData
                };

                const promise = fetch(`${apiUrl}/otherImage`, requestForOtherImage)
                    .then(response => response.json())
                    .catch(error => console.error('Error:', error));

                promises.push(promise);
            });

            Promise.all(promises)
                .then(() => {
                    const formData = new FormData();
                    formData.append("propertyId", data._id);
                    formData.append("imageUrl", input[0].files[0]);

                    const requestForCoverImage = {
                        method: 'POST',
                        body: formData
                    };

                    return fetch(`${apiUrl}/coverImage`, requestForCoverImage);
                })
                .then(response => response.json())
                .then(coverImageData => {
                    document.querySelector(".add-products button").classList.remove("active")
                    resetFormFields()
                    console.log("All API calls completed successfully");
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
});



function resetFormFields() {
    // Select all input elements
    const inputs = document.querySelectorAll('input');
    // Loop through each input
    inputs.forEach(input => {
        // Reset based on input type
        switch (input.type) {
            case 'text':
            case 'password':
            case 'email':
            case 'number':
            case 'search':
            case 'url':
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'time':
            case 'week':
                input.value = ''; // Clear text-based inputs
                break;
            case 'checkbox':
            case 'radio':
                input.checked = false; // Uncheck checkboxes and radios
                break;
            case 'file':
                input.value = ''; // Clear file input
                break;
            default:
                // Handle other types if necessary
                input.value = '';
                break;
        }
    });

    // Select all textarea elements
    const textareas = document.querySelectorAll('textarea');
    // Loop through each textarea and clear its content
    textareas.forEach(textarea => {
        textarea.value = '';
    });

    // Optional: If you want to reset select elements to their default (first option)
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0; // Reset select elements to their first option
    });
    for (let i = 0; i < imageCovers.length; i++) {
        const element = imageCovers[i].src=""
        
    }
}


