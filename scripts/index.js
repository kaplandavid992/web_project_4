let profileEditBtn = document.querySelector(".profile__edit-btn");
let popupExitBtn = document.querySelector(".popup__exit-btn");
let popupForm = document.querySelector(".popup__form");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector(".popup__form-input_field_name");
let roleInput = document.querySelector(".popup__form-input_field_role");
let profileName = document.querySelector(".profile__name");
let profileRole = document.querySelector(".profile__role");


function togglePopupDisplay() {
  popup.classList.toggle("popup_display_flex");
}

function exitForm() {
  togglePopupDisplay();
}

function saveForm(e) {
  profileName.textContent = nameInput.value;
  profileRole.textContent = roleInput.value;
  e.preventDefault();
  exitForm();
}

function editProfile() {
  nameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
  togglePopupDisplay();
}

profileEditBtn.addEventListener("click", editProfile);
popupExitBtn.addEventListener("click", exitForm);
popupForm.addEventListener("submit", saveForm);

