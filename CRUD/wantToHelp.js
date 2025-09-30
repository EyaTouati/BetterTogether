let requests = JSON.parse(localStorage.getItem("requests")) || [];
let container = document.getElementById("requests-container");

function displayRequests() {
  container.innerHTML = "";

  requests.forEach((req, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between space-y-2";

    
    const normalView = document.createElement("div");
    normalView.innerHTML = `
      <h3 class="text-xl font-bold text-blue-700">${req.name}</h3>
      <p class="text-gray-700"><strong>Email:</strong> ${req.email}</p>
      <p class="text-gray-700"><strong>Phone:</strong> ${req.phone}</p>
      <p class="text-gray-700"><strong>City:</strong> ${req.city}</p>
      <p class="text-gray-600 italic">"${req.description}"</p>
    `;

   
    const editView = document.createElement("div");
    editView.classList.add("hidden", "space-y-2");
    editView.innerHTML = `
      <input value="${req.name}" class="w-full border rounded px-2 py-1" placeholder="Name" />
      <input value="${req.email}" class="w-full border rounded px-2 py-1" placeholder="Email" />
      <input value="${req.phone}" class="w-full border rounded px-2 py-1" placeholder="Phone" />
      <input value="${req.city}" class="w-full border rounded px-2 py-1" placeholder="City" />
      <textarea class="w-full border rounded px-2 py-1" placeholder="Description">${req.description}</textarea>
    `;

  
    const btns = document.createElement("div");
    btns.className = "flex gap-2 justify-end pt-2";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600";
    deleteBtn.onclick = () => {
      if (confirm("Are you sure you want to delete this request?")) {
        requests.splice(index, 1);
        localStorage.setItem("requests", JSON.stringify(requests));
        displayRequests();
      }
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className =
      "bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className =
      "bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 hidden";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className =
      "bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 hidden";

   
    editBtn.onclick = () => {
      normalView.classList.add("hidden");
      editView.classList.remove("hidden");
      editBtn.classList.add("hidden");
      deleteBtn.classList.add("hidden");
      saveBtn.classList.remove("hidden");
      cancelBtn.classList.remove("hidden");
    };

    
    cancelBtn.onclick = () => {
      normalView.classList.remove("hidden");
      editView.classList.add("hidden");
      editBtn.classList.remove("hidden");
      deleteBtn.classList.remove("hidden");
      saveBtn.classList.add("hidden");
      cancelBtn.classList.add("hidden");
    };

    
    saveBtn.onclick = () => {
      const inputs = editView.querySelectorAll("input, textarea");
      const [name, email, phone, city, description] = [...inputs].map(
        (el) => el.value.trim()
      );

      requests[index] = { name, email, phone, city, description };
      localStorage.setItem("requests", JSON.stringify(requests));
      displayRequests();
    };

    btns.append(editBtn, cancelBtn, saveBtn, deleteBtn);
    card.append(normalView, editView, btns);
    container.appendChild(card);
  });
}

displayRequests();
