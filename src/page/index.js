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
  gallerySelector,
  userName,
  userRole
} from "../utils/constants.js";

import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { api } from "../components/Api.js";

const gallery = new Section(
  {
    data: [],
    renderer: (item) => {
      gallery.addItem(cardRenderer(item));
    },
  },
  gallerySelector
);

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

api.getUserInfo().then((res) => {
  userName.textContent = res.name;
  userRole.textContent = res.about;
});

api.getInitialCards().then((res) => {
  const cards = Array.from(res);
  cards.forEach((card) => {
    gallery.addItem(cardRenderer(card));
  });
});

function handleProfileFormSubmit() {
  const inputFields = editPopup.getInputValues();
  profileUserInfo.setUserInfo(inputFields);
  api.editUserInfo(inputFields);
}

function handleCardFormSubmit() {
  const inputFields = addPopup.getInputValues();
  const text = inputFields.form__title;
  const image = inputFields.form__imageLink;
  const item = {};
  item.name = text;
  item.link = image;
  gallery.addItem(cardRenderer(item));
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
