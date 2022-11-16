function userDetails(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const number = event.target.number.value;
  const email = event.target.email.value;

  const obj = {
    name,
    number,
    email,
  };

  axios
    .post("http://localhost:3000/user/add-user", obj)
    .then((response) => {
      console.log(response);
      showNewUserOnScreen(response.data.newUserDetail);
      console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>Something went wrong</h4>";
      console.log(err);
    });

  //localStorage.setItem(obj.email, JSON.stringify(obj));
  showNewUserOnScreen(JSON.stringify(obj));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    //Make a GET request to localhost when the DOM has loaded and get the user Details which have been saved and show it on the website
    .get("http://localhost:3000/user/get-users")
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.allUsers.length; i++) {
        showNewUserOnScreen(response.data.allUsers[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

function showNewUserOnScreen(user) {
  document.getElementById("email").value = " ";
  document.getElementById("name").value = " ";
  document.getElementById("number").value = " ";

  if (localStorage.getItem(user.email) !== null) {
    removeUserFromScreen(user.email);
  }

  const parentNode = document.getElementById("listOfUsers");
  const childHTML = `<li id=${user.id}>${user.name} - ${user.email} - ${user.number}
  <button onClick=deleteUser("${user.id}")>Delete</button>
  <button onClick=editUserDetails("${user.email}","${user.number}","${user.name}","${user.id}")>Edit</button>
  </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User
function editUserDetails(emailId, name, userId, number) {
  document.getElementById("email").value = emailId;
  document.getElementById("name").value = name;
  document.getElementById("number").value = number;

  deleteUser(userId);
}
//deleteUser('abc@gmail.com')
function deleteUser(userId) {
  axios
    .delete(`http://localhost:3000/user/delete-user/${userId}`)
    .then((response) => {
      removeUserFromScreen(userId);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("listOfUsers");
  const childNodeToBeDeleted = document.getElementById(userId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}
