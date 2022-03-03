import "./index.css";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  settings,
  nameSelector,
  roleSelector,
  profileAddBtn,
  profileEditBtn,
  imagePopupSelector,
  cardListSelector,
} from "../utils/constants.js";
import { initialCards } from "../utils/cardsList.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";

const addPopup = new PopupWithForm("#addImage", handleCardFormSubmit);
const editPopup = new PopupWithForm("#editProfile", handleProfileFormSubmit);
const imagePopup = new PopupWithImage(imagePopupSelector);
const profileUserInfo = new UserInfo({ nameSelector, roleSelector });

const formValidators = {};
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);
editPopup.setEventListeners();
addPopup.setEventListeners();

const cardRenderer = (item) => {
  const text = item.name;
  const image = item.link;
  const handleCardClick = (imagePopup) => {
    imagePopup.open(image, text);
  };

  imagePopup.setEventListeners();
  const card = new Card(
    {
      text,
      image,
      handleCardClick: () => {
        handleCardClick(imagePopup);
      },
    },
    "#card-template"
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardsList.addItem(cardRenderer(item));
    },
  },
  cardListSelector
);
cardsList.renderer();

function handleProfileFormSubmit() {
  const inputFields = editPopup.getInputValues();
  profileUserInfo.setUserInfo(inputFields);
}

function handleCardFormSubmit() {
  const inputFields = addPopup.getInputValues();
  const text = inputFields.form__title;
  const image = inputFields.form__imageLink;
  const item = {};
  item.name = text;
  item.link = image;
  cardsList.addItem(cardRenderer(item));
}

profileEditBtn.addEventListener("click", () => {
  const currentUserProfile = profileUserInfo.getUserInfo();
  inputName.setAttribute("value", currentUserProfile.name);
  inputRole.setAttribute("value", currentUserProfile.role);
  formValidators["edit__form"].resetValidation();
  editPopup.open();
});

profileAddBtn.addEventListener("click", () => {
  formValidators["add__form"].resetValidation();
  addPopup.open();
});
