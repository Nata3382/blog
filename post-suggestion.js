const form = document.querySelector("form");

form.elements.username.focus();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(form.elements.title.value);
  console.log(form.elements.username.value);
  console.log(form.elements.Udsnit.value);
  console.log(form.elements.content.value);

  const payload = {
    title: form.elements.title.value,
    username: form.elements.username.value,
    Udsnit: form.elements.Udsnit.value,
    content: form.elements.content.value,
  };

  document.querySelector("input[type=submit]").disabled = true;

  fetch("https://kea21-ed2b.restdb.io/rest/post", {
    method: "POST",
    headers: {
      "x-apikey": "606d5e92f553500431007501",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      document.querySelector("input[type=submit]").disabled = false;
      form.elements.title.value = "";
      form.elements.username.value = "";
      form.elements.Udsnit.value = "";
      form.elements.content.value = "";
      document.querySelector("p.hidden").classList.remove("hidden");
    })
    .catch((err) => {
      console.error(err);
    });
});
