import "./index.css";
import { initialCards } from "../utils/cardsList.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

const imagePopupSelector = "#imagePopUp";
const cardListSelector = ".elements__list";
const name = ".profile__name";
const role = ".profile__role";
const cardsElementsList = document.querySelector(cardListSelector);
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const inputName = document.querySelector("#inputName");
const inputRole = document.querySelector("#inputRole");

const settings = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-btn",
  inactiveButtonClass: "popup__form-submit-btn_inactive",
  inputErrorClass: "popup__form-errorMsg",
  errorClass: "popup__form-errorMsg_active",
};

const profileFormValidator = new FormValidator(settings, editProfileForm);
const newPlaceformValidator = new FormValidator(settings, createNewPlaceForm);
const addPopup = new PopupWithForm("#addImage", submitAddHandler);
const editPopup = new PopupWithForm("#editProfile", submitProfileHandler);
const profileUserInfo = new UserInfo({name, role});

editPopup.setEventListeners();
addPopup.setEventListeners();
profileFormValidator.enableValidation();
newPlaceformValidator.enableValidation();

function handleCardClick(image, text) {
  const imagePopup = new PopupWithImage({ imagePopupSelector, image, text });
  imagePopup.generateImagePopup();
  imagePopup.setEventListeners();
}

function setCardInstance(text, image) {
  const card = new Card(
    { text, image, handleCardClick: handleCardClick.bind(this, image, text) },
    "#card-template"
  );
  const cardElement = card.generateCard();
  card._setEventListeners();
  return cardElement;
}

function submitProfileHandler() {
  profileUserInfo.setUserInfo();
}

function submitAddHandler() {
  const inputFields = this._getInputValues();
  const text = inputFields.form__title;
  const image = inputFields.form__imageLink;
  const cardElement = setCardInstance(text, image);
  cardsElementsList.prepend(cardElement);
  newPlaceformValidator.resetValidation();
}

profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = profileUserInfo.getUserInfo();
  inputName.setAttribute("value", currentUserInfo.name);
  inputRole.setAttribute("value", currentUserInfo.role);
  editPopup.open();
});

profileAddBtn.addEventListener("click", () => {
  addPopup.open();
});

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const text = item.name;
      const image = item.link;
      const cardElement = setCardInstance(text, image);
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

cardsList.renderer();
