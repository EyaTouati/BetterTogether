let requests = JSON.parse(localStorage.getItem("requests")) || [];
let form = document.getElementById("help-form");
let nameInput = document.getElementById("name-input");
let emailInput = document.getElementById("email-input");
let phoneInput = document.getElementById("phone-input");
let cityInput = document.getElementById("city-input");
let descriptionInput = document.getElementById("description-input");

form.addEventListener("submit", () => {
  

  if (nameInput.value && emailInput.value && phoneInput.value && cityInput.value && descriptionInput.value) {
    const newRequest = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      city: cityInput.value,
      description: descriptionInput.value,
      timestamp: Date.now(),
    };

    requests.push(newRequest);
    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Your request has been submitted successfully!");
    form.reset();
  } else {
    alert("Please fill all fields.");
  }
});
