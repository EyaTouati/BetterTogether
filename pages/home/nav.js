let nav = document.querySelector("#nav");

window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY;
    console.log("Scroll position:", scrollPosition);
    if (scrollPosition > 500) {
        nav.classList.remove("bg-white");
        nav.classList.remove("bg-opacity-10");
        nav.classList.add("bg-sky-600");
        nav.classList.add("bg-opacity-50");
    } else {
        nav.classList.add("bg-white");
        nav.classList.add("bg-opacity-10");
        nav.classList.remove("bg-sky-600");
        nav.classList.remove("bg-opacity-50");
    }
});