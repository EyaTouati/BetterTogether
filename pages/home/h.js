setTimeout(() => {
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let exps = JSON.parse(localStorage.getItem("experiences")) || [];

    const annonceCounter = document.getElementById("annonce-counter");
    const userCounter = document.getElementById("user-counter");
    const expCounter = document.getElementById("experience-counter");

    if (annonceCounter && userCounter && expCounter) {
      annonceCounter.setAttribute("data-target", requests.length);
      userCounter.setAttribute("data-target", users.length);
      expCounter.setAttribute("data-target", exps.length);

      const counters = document.querySelectorAll('[data-target]');
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const increment = target / 200;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    }
  }, 3100); // 2400ms (apparition) + 700ms (transition)


