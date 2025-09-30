document.addEventListener("DOMContentLoaded", () => {
      const showElement = (id, delay) => {
        setTimeout(() => {
          const el = document.getElementById(id);
          el.classList.remove("opacity-0", "translate-y-10");
          el.classList.add("opacity-100", "translate-y-0");
        }, delay);
      };

      showElement("title", 300);
      showElement("subtitle", 1000);
      showElement("cta", 1700);
      showElement("ct", 2400);
    });
   


