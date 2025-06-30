let ctn = JSON.parse(localStorage.getItem("ctns")) || [];

let name = document.getElementById("contact-name");
let email = document.getElementById("contact-email");
let message = document.getElementById("contact-message");
let addBtn = document.getElementById("btn");

addBtn.addEventListener("click", (e) => {
  

  if (name.value && email.value && message.value) {
    let user = {
      name: name.value,
      email: email.value,
      message: message.value
    };
    ctn.push(user);
    localStorage.setItem("ctns", JSON.stringify(ctn)); 

    name.value = "";
    email.value = "";
    message.value = "";

    alert("Message sent successfully!");
  } else {
    alert("Please fill in all fields.");
  }
});
