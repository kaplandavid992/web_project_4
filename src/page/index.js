import "./index.css";
import { initialCards } from "../utils/cardsList.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

const cardListSelector = ".elements__list";
const cardsElementsList = document.querySelector(cardListSelector);
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const imagePopupSelector = "#imagePopUp";

const settings = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-btn",
  inactiveButtonClass: "popup__form-submit-btn_inactive",
  inputErrorClass: "popup__form-errorMsg",
  errorClass: "popup__form-errorMsg_active",
};

const profileFormValidator = new FormValidator(settings, editProfileForm);
const newPlaceformValidator = new FormValidator(settings, createNewPlaceForm);

profileFormValidator.enableValidation();
newPlaceformValidator.enableValidation();

function submitProfileHandler() {
  const inputFields = this._getInputValues();
  const name = inputFields.form__name;
  const role = inputFields.form__role;
  const profileUserInfo = new UserInfo({ name, role });
  profileUserInfo.setUserInfo();
}

function handleCardClick(image, text) {
  const imagePopup = new PopupWithImage({ imagePopupSelector, image, text });
  imagePopup.generateImagePopup();
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

function submitAddHandler() {
  const inputFields = this._getInputValues();
  const text = inputFields.form__title;
  const image = inputFields.form__imageLink;
  const cardElement = setCardInstance(text, image);
  cardsElementsList.prepend(cardElement);
  newPlaceformValidator.resetValidation();
}

profileEditBtn.addEventListener("click", () => {
  const editPopup = new PopupWithForm("#editProfile", submitProfileHandler);
  editPopup.open();
  editPopup.setEventListeners();
});

profileAddBtn.addEventListener("click", () => {
  const addPopup = new PopupWithForm("#addImage", submitAddHandler);
  addPopup.open();
  addPopup.setEventListeners();
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
