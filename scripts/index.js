import { openPopup, closePopup } from "./utils.js";
import { initialCards } from "./cardsList.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const cardsElementsList = document.querySelector(".elements__list");
const editProfileForm = document.querySelector("#editProfileForm");
const createNewPlaceForm = document.querySelector("#createNewPlaceForm");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");
const profilePopUp = document.querySelector("#editProfile");
const inputName = editProfileForm.querySelector("#inputName");
const inputRole = editProfileForm.querySelector("#inputRole");
const addImagePopUp = document.querySelector("#addImage");
const inputTitle = createNewPlaceForm.querySelector("#inputTitle");
const inputLink = createNewPlaceForm.querySelector("#inputLink");
const popupList = document.querySelectorAll(".popup");

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-btn",
  inactiveButtonClass: "popup__form-submit-btn_inactive",
  inputErrorClass: "popup__form-errorMsg",
  errorClass: "popup__form-errorMsg_active",
};

initialCards.forEach((item) => {
  const card = new Card(
    { text: item.name, image: item.link },
    "#card-template"
  );
  const cardElement = card.generateCard();
  cardsElementsList.append(cardElement);
});

const profileFormValidator = new FormValidator(settings, editProfileForm);
profileFormValidator.enableValidation();
const newPlaceformValidator = new FormValidator(settings, createNewPlaceForm);
newPlaceformValidator.enableValidation();

[...popupList].forEach( function(popup) {
  const popupCloseButton = document.querySelector(".popup__exit-btn");
  popupCloseButton.addEventListener("click", () => {
    closePopup(popup);
  });
  popup.addEventListener("mousedown", function (e) {
    if (
      e.target.classList.contains("popup_active") ||
      e.target.classList.contains("popup__exit-icon")
    ) {
      closePopup(popup);
    }
  });
});

function toggleProfileForm() {
  openPopup(profilePopUp);
}

function toggleAddImageForm() {
  openPopup(addImagePopUp);
}

function submitProfileForm(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileRole.textContent = inputRole.value;
  closePopup(profilePopUp);
}

function submitNewPlaceForm(e) {
  e.preventDefault();
  const card = new Card(
    { text: inputTitle.value, image: inputLink.value },
    "#card-template"
  );
  const cardElement = card.generateCard();
  cardsElementsList.prepend(cardElement);
  closePopup(addImagePopUp);
  inputTitle.value = "";
  inputLink.value = "";
}

profileEditBtn.addEventListener("click", toggleProfileForm);
profileAddBtn.addEventListener("click", toggleAddImageForm);
editProfileForm.addEventListener("submit", submitProfileForm);
createNewPlaceForm.addEventListener("submit", submitNewPlaceForm);
