let url = "http://localhost:3000/users";

const usersTable = document.querySelector("#users tbody");
getUsers(url)
  .then((data) => {
    usersTable.innerHTML = "";
    data.forEach((user) => {
      let userRow =
        '<td class="id">' +
        user.id +
        "</td><td>" +
        user.name +
        "</td><td>" +
        user.login +
        "</td>";
      let buttons =
        '<td><button class="edit">редактировать</button><button class="delete">удалить</button></td>';
      usersTable.innerHTML += "<tr>" + userRow + buttons + "</tr>";
    });
  })
  .then(() => {
    let delBtns = document.querySelectorAll(".delete");
    delBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        let id = btn.parentElement.parentElement.querySelector(".id").innerText;
        let urlToDelete = url + "/" + id;
        deleteUser(urlToDelete).then(() => location.reload());
      });
    });
  })
  .then(() => {
    let editBtns = document.querySelectorAll(".edit");
    editBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        let id = btn.parentElement.parentElement.querySelector(".id").innerText;
        let urlToPut = url + "/" + id;
        let name = document.querySelector(".nameToAdd").value;
        let login = document.querySelector(".loginToAdd").value;
        putUser(urlToPut, { name: name, login: login }).then(() =>
          location.reload()
        );
      });
    });
  });

const addButton = document.querySelector(".add");
addButton.addEventListener("click", () => {
  const name = document.querySelector(".nameToAdd").value;
  const login = document.querySelector(".loginToAdd").value;

  postUser(url, { name: name, login: login });
});

async function deleteUser(url) {
  const response = await fetch(url, {
    method: "DELETE",
  });
  return response.json();
}

async function postUser(url, body) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",
    body: JSON.stringify(body),
  });

  return response.json();
}

async function getUsers(url) {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

async function putUser(url, body) {
  let response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
