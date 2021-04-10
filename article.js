const searchParams = new URLSearchParams(window.location.search);

const articleId = searchParams.get("article");

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
    showPost(response);
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

  // const template = document.querySelector(".commentTemplate").content;

  // data.comments.array.forEach((comment) => {
  //   console.log(comment);
  //   const clone = template.cloneNode(true);
  //   clone.querySelector("h3").textContent = comments.content;
  //   clone.querySelector("p").textContent = commments.username;
  //   document.querySelector(".commentList").appendChild(clone);
  // });
  // if (data.comments.length === 0) {
  //   const clone = template.cloneNode(true);
  //   clone.querySelector("h3").textContent = "No one has commented on this post";
  //   document.querySelector(".commentList").appendChild(clone);
  // }
}
