let loginForm = document.getElementById("login-form");
let registerForm = document.getElementById("register-form");
let users = JSON.parse(localStorage.getItem("users")) || [];
function toggleForms() {
  loginForm.classList.toggle("hidden");
  registerForm.classList.toggle("hidden");
}



registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
  let username = document.getElementById("register-username").value;
  let email = document.getElementById("register-email").value;
  let password = document.getElementById("register-password").value;

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Compte créé !");
  username = "";
  email = "";
  password = "";
 toggleForms()
  window.location.href = "../html/affichage.html";

});


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    if (email==="admin@gmail.com"&& password==="admin123"){
      localStorage.setItem("isLoggedIn", "true");
      window.location.href ="../html/affichage.html";
      return;

    }
   
    email = "";
    password = "";
    window.location.href = "../../home/index.html";


  } else {
    alert("Email ou mot de passe incorrect.");
  }
});
