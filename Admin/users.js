let tableBody = document.getElementById("table-body");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentEditIndex = null;

function displayUsers() {
  tableBody.innerHTML = "";
  users.forEach((user, index) => {
    tableBody.innerHTML += `
      <tr>
        <td class="border px-4 py-2">${index + 1}</td>
        <td class="border px-4 py-2">${user.username}</td>
        <td class="border px-4 py-2">${user.email}</td>
       
        <td class="border px-4 py-2 space-x-2">
          <button onclick="editUser(${index})" class="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
          <button onclick="deleteUser(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </td>
      </tr>`;
  });
}

function deleteUser(index) {
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers();
}

function editUser(index) {
  currentEditIndex = index;
  document.getElementById("contact-name").value = users[index].username;
  document.getElementById("contact-email").value = users[index].email;
  document.getElementById("update-fields").classList.remove("hidden");
  document.getElementById("update-btn").style.display = "inline-block";
  document.getElementById("cancel-btn").style.display = "inline-block";
}

document.getElementById("update-btn").addEventListener("click", () => {
  users[currentEditIndex].username = document.getElementById("contact-name").value;
  users[currentEditIndex].email = document.getElementById("contact-email").value;
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers();
  cancelEdit();
});

document.getElementById("cancel-btn").addEventListener("click", cancelEdit);

function cancelEdit() {
  document.getElementById("update-fields").classList.add("hidden");
  document.getElementById("update-btn").style.display = "none";
  document.getElementById("cancel-btn").style.display = "none";
}

displayUsers();
