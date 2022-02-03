import { openPopup, closePopup } from "./utils.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-btn",
  inactiveButtonClass: "popup__form-submit-btn_inactive",
  inputErrorClass: "popup__form-errorMsg",
  errorClass: "popup__form-errorMsg_active",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

 initialCards.forEach((item) => {
  const card = new Card({ text: item.name , image: item.link } , "#card-template");
  const cardElement = card.generateCard();
document.querySelector(".elements__list").append(cardElement);
 });
 
function toggleProfileForm() {
  openPopup(profilePopUp);
  const formValidator = new FormValidator(settings, editProfileForm);
  formValidator.enableValidation();
}

function toggleAddImageForm() {
  openPopup(addImagePopUp);
  const formValidator = new FormValidator(settings, createNewPlaceForm);
  formValidator.enableValidation();
}

function submitProfileForm(e) {
  profileName.textContent = inputName.value;
  profileRole.textContent = inputRole.value;
  e.preventDefault();
  closePopup(profilePopUp);
}

function submitNewPlaceForm(e) {
  const card = new Card({ text: inputTitle.value , image: inputLink.value } , "#card-template");
  const cardElement = card.generateCard();
  document.querySelector(".elements__list").prepend(cardElement);
  closePopup(addImagePopUp);
  inputTitle.value = "";
  inputLink.value = "";
  e.preventDefault();
}

profileEditBtn.addEventListener("click", toggleProfileForm);
profileAddBtn.addEventListener("click", toggleAddImageForm);
editProfileForm.addEventListener("submit", submitProfileForm);
createNewPlaceForm.addEventListener("submit", submitNewPlaceForm);
