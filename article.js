const searchParams = new URLSearchParams(window.location.search);

const articleId = urlParams.get("article");

fetch("https://kea21-ed2b.restdb.io/rest/post/" + articleId, {
  method: "GET",
  headers: {
    "x-apikey": "606d5e92f553500431007501",
  },
})
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

fetch(
  "https://kea21-ed2b.restdb.io/rest/post/" + articleId + "?fetchchildren=true",
  {
    method: "GET",
    headers: {
      "x-apikey": "606d5e92f553500431007501",
    },
  }
)
  .then((res) => res.json())
  .then((response) => {
    showComments(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
  console.log(data);
  document.querySelector("div.article h1").textContent = data.title;
  document.querySelector("div.article h2 span").textContent = data.username;
  document.querySelector("div.article h3").textContent = data.Udsnit;
  document.querySelector("div.article p").textContent = data.content;
}

function showComments(comments) {
  const template = document.querySelector(".commentTemplate").content;
  comments.forEach((comment) => {
    console.log(comment);
    const copy = template.cloneNode(true);
    copy.querySelector(h5.comment_username).textContent = comment.username;
    copy.querySelector(h4.comment_content).textContent = comment.content;
    document.querySelector(".commentList").appendChild(copy);
  });
  if (comments.length == 0) {
    const copy = template.cloneNode(true);
    copy.querySelector(h5.comment_username).textContent = "";
    copy.querySelector(h4.comment_content).textContent =
      "No one has commented on this post";
    document.querySelector(".commentTemplate").appendChild(copy);
  }
}

const form = document.querySelector(".comment_form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const payload = {
    username: form.elements.username.value,
    content: form.elements.content.value,
  };
  document.querySelector("input[type=submit]").disabled = true;

  console.log(payload);
  fetch(`https://kea21-ed2b.restdb.io/rest/post/${articleId}/comments`, {
    method: "POST",
    headers: {
      "x-apikey": "606d5e92f553500431007501",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      const template = document.querySelector(".commentList").content;
      const copy = template.cloneNode(true);
      copy.querySelector(h5.comment_username).textContent = data.username;
      copy.querySelector(h4.comment_content).textContent = data.content;
      form.elements.username.value = "";
      form.elements.content.value = "";
      document.querySelector(".comment_form").remove();
    });
}
