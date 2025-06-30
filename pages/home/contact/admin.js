let ctn = JSON.parse(localStorage.getItem("ctns")) || [];
let tableBody = document.getElementById("table-body");
let updateBtn = document.getElementById("update-btn");
let cancelBtn = document.getElementById("cancel-btn");
let currentIndex = null;


let nameInput = document.createElement("input");
let emailInput = document.createElement("input");
let messageInput = document.createElement("textarea");

function displayUsers() {
  tableBody.innerHTML = "";

  ctn.forEach((user, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.message}</td>
        <td>
          <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded" onclick="deleteUser(${index})">Delete</button>
          <button class="update-btn bg-blue-500 text-white px-2 py-1 rounded" onclick="AfficheUpdateUser(${index})">Update</button>
        </td>
      </tr>`;
  });
}

function deleteUser(index) {
  ctn.splice(index, 1);
  saveToLocalStorage();
  displayUsers();
}

function saveToLocalStorage() {
  localStorage.setItem("ctns", JSON.stringify(ctn));
}

function AfficheUpdateUser(index) {
  currentIndex = index;

  let user = ctn[index];

  nameInput.value = user.name;
  emailInput.value = user.email;
  messageInput.value = user.message;

  nameInput.placeholder = "New name";
  emailInput.placeholder = "New email";
  messageInput.placeholder = "New message";

  nameInput.className = "border p-2 m-1 w-full";
  emailInput.className = "border p-2 m-1 w-full";
  messageInput.className = "border p-2 m-1 w-full";

  let container = document.getElementById("container");

  container.appendChild(nameInput);
  container.appendChild(emailInput);
  container.appendChild(messageInput);

  updateBtn.style.display = "inline-block";
  cancelBtn.style.display = "inline-block";
}

function cancelUpdate() {
  nameInput.remove();
  emailInput.remove();
  messageInput.remove();
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  currentIndex = null;
}

updateBtn.addEventListener("click", () => {
  if (currentIndex !== null) {
    ctn[currentIndex].name = nameInput.value;
    ctn[currentIndex].email = emailInput.value;
    ctn[currentIndex].message = messageInput.value;

    saveToLocalStorage();
    displayUsers();
    cancelUpdate();
  }
});

cancelBtn.addEventListener("click", cancelUpdate);


displayUsers();
