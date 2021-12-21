let profileEditBtn = document.querySelector(".profile__edit-btn");
let profileAddBtn = document.querySelector(".profile__add-btn");
let formExitBtn = document.querySelector(".form__exit-btn");
let form = document.querySelector(".form");

function exitForm() {
  let overlay = document.querySelector(".overlay");
  let form = document.querySelector(".form");
  form.setAttribute("style", "display:none");
  overlay.setAttribute("style", "display:none");
}

function saveForm(e) {
  let name = document.querySelector(".form__name");
  let role = document.querySelector(".form__role");
  let profileName = document.querySelector(".profile__name");
  let profileRole = document.querySelector(".profile__role");
  profileName.textContent = name.value;
  profileRole.textContent = role.value;
  e.preventDefault();
  exitForm();
}

function editprofile() {
  let form = document.querySelector(".form");
  let overlay = document.querySelector(".overlay");
  form.setAttribute("style", "display:flex");
  overlay.setAttribute("style", "display: flex");
}

profileEditBtn.addEventListener("click", editprofile);
formExitBtn.addEventListener("click", exitForm);
form.addEventListener("submit", saveForm);
