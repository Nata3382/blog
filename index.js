function getdata() {
  fetch("https://kea21-ed2b.restdb.io/rest/post", {
    method: "GET",
    headers: {
      "x-apikey": "606d5e92f553500431007501",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showPosts(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

getdata();

function showPosts(posts) {
  console.log(posts);
  const template = document.querySelector("template.blog").content;
  posts.forEach((post) => {
    const copy = template.cloneNode(true);
    copy.querySelector("h2").textContent = post.title;
    copy.querySelector("h3").textContent = post.username;
    copy.querySelector("h4").textContent = post.Udsnit;

    document.querySelector("main").appendChild(copy);
  });
}
