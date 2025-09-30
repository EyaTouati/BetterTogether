
let bt = document.getElementById("btn");
let nameInput = document.getElementById("name-input");
let expInput = document.getElementById("exp-input");
let fileInput = document.getElementById("file-upload");
let exps = JSON.parse(localStorage.getItem("experiences")) || [];
let editIndex = localStorage.getItem("editIndex") || -1;

if (bt && editIndex === -1) {
  bt.addEventListener("click", () => {
    if (nameInput.value && expInput.value) {
      const newExp = {
        name: nameInput.value,
        story: expInput.value,
        image: "",
      };

      if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          newExp.image = e.target.result;
          exps.push(newExp);
          saveToLocalStorage();
          nameInput.value = "";
          expInput.value = "";
          fileInput.value = "";
          window.location.href = "../home/index.html";
        };
        reader.readAsDataURL(fileInput.files[0]);
      } else {
        newExp.image = "default.jpg";
        exps.push(newExp);
        saveToLocalStorage();
        nameInput.value = "";
        expInput.value = "";
        fileInput.value = "";
        window.location.href = "../home/index.html";
      }
    } else {
      alert("Please fill in both fields.");
    }
  });
}

if (bt && editIndex !== -1) {
  bt.addEventListener("click", () => {
    if (nameInput.value && expInput.value) {
      exps[editIndex].name = nameInput.value;
      exps[editIndex].story = expInput.value;
      localStorage.setItem("experiences", JSON.stringify(exps));
      localStorage.removeItem("editIndex");
      nameInput.value = "";
      expInput.value = "";
      fileInput.value = "";
      window.location.href = "../home/index.html";
    } else {
      alert("Please fill in both fields.");
    }
  });
}

if (editIndex !== -1) {
  const expToEdit = exps[editIndex];
  nameInput.value = expToEdit.name;
  expInput.value = expToEdit.story;
  bt.textContent = "Update Experience";
  fileInput.parentElement.style.display = "none";
}


// Enregistrer dans localStorage
function saveToLocalStorage() {
  localStorage.setItem("experiences", JSON.stringify(exps));
}

// Supprimer un utilisateur
function deleteUser(index) {
  exps.splice(index, 1);
  saveToLocalStorage();
  displayUsers();
}

// Afficher les cartes 3D
function displayUsers() {
  const cartes = document.getElementById("cards-container");
  if (!cartes) return;

  cartes.innerHTML = "";

  exps.forEach((exp, index) => {
    const card = document.createElement("div");
    card.className = "relative card w-[240px] h-[280px] bg-white rounded-md";
    card.style.border = "1px solid gray";
    card.style.transformStyle = "preserve-3d";
    card.style.transition = "transform 0.9s";

    // Side gauche
    const left = document.createElement("div");
    left.className = "side rounded-l-md";
    left.style.width = "40px";
    left.style.height = "280px";
    left.style.backgroundColor = "rgb(175, 165, 165)";
    left.style.transformOrigin = "left";
    left.style.transform = "translateX(240px) rotateY(90deg)";
    left.style.position = "absolute";
    left.style.left = "-1px";
    left.style.top = "-1px";
    left.style.border = "1px solid white";
    left.style.borderRadius = "0.375rem 0 0 0.375rem";

    // Side bas avec boutons
    const bottom = document.createElement("div");
    bottom.className = "side flex justify-around items-center rounded-b-md";
    bottom.style.width = "240px";
    bottom.style.height = "40px";
    bottom.style.backgroundColor = "rgb(175, 165, 165)";
    bottom.style.transformOrigin = "top";
    bottom.style.transform = "translateY(280px) rotateX(-90deg)";
    bottom.style.position = "absolute";
    bottom.style.left = "-1px";
    bottom.style.top = "-1px";
    bottom.style.border = "1px solid white";
    bottom.style.borderRadius = "0 0 0.375rem 0.375rem";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "del";
    deleteBtn.className = "cursor-pointer w-[50px] h-[30px] bg-red-500 text-white rounded hover:bg-red-600 transition";
    deleteBtn.onclick = () => deleteUser(index);

    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.className = "cursor-pointer w-[50px] h-[30px] bg-green-800 text-white rounded hover:bg-green-900 transition";
    editBtn.onclick = () => {
      localStorage.setItem("editIndex", index);
      window.location.href = "/pages/experience/experience.html";
    };

    bottom.appendChild(deleteBtn);
    bottom.appendChild(editBtn);

    // Face principale
    const main = document.createElement("div");
    main.className = "side w-[240px] h-[280px] rounded-md flex flex-col items-center  text-center bg-white";
    main.style.position = "absolute";
    main.style.left = "-1px";
    main.style.top = "-1px";
    main.style.border = "1px solid white";

    const img = document.createElement("img");
    img.src = exp.image || "default.jpg";
    img.className = "w-full h-[140px] rounded-md object-cover ";

    const name = document.createElement("h3");
    name.textContent = exp.name;
    name.className = "text-lg font-semibold text-indigo-700 mt-2";

    const story = document.createElement("p");
    story.textContent = exp.story;
    story.className = "text-sm mt-1 text-gray-600 px-1 line-clamp-3";

    main.appendChild(img);
    main.appendChild(name);
    main.appendChild(story);

    // Assembler la carte
    card.appendChild(left);
    card.appendChild(bottom);
    card.appendChild(main);

    cartes.appendChild(card);
  });
}




// Exécution automatique
if (document.getElementById("cards-container")) {
  displayUsers();
}
