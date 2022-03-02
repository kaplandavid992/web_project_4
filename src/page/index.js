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
  cardsElementsList,
  imagePopupSelector,
  cardListSelector,
} from "../utils/constants.js";
import { initialCards } from "../utils/cardsList.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";

const profileFormValidator = new FormValidator(settings, editProfileForm);
const newPlaceformValidator = new FormValidator(settings, createNewPlaceForm);
const addPopup = new PopupWithForm("#addImage", submitAddHandler);
const editPopup = new PopupWithForm("#editProfile", submitProfileHandler);
const profileUserInfo = new UserInfo({ nameSelector, roleSelector });
editPopup.setEventListeners();
addPopup.setEventListeners();
profileFormValidator.enableValidation();
newPlaceformValidator.enableValidation();

function handleCardClick(imagePopup) {
  imagePopup.generateImagePopup();
  imagePopup.open();
}

function setCardInstance(text, image) {
  const imagePopup = new PopupWithImage({ imagePopupSelector, image, text });
  
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
  card.setEventListeners();

  return cardElement;
}

function submitProfileHandler() {
  profileUserInfo.setUserInfo();
}

function submitAddHandler() {
  const inputFields = addPopup.getInputValues();
  const text = inputFields.form__title;
  const image = inputFields.form__imageLink;
  const cardElement = setCardInstance(text, image);
  cardsElementsList.prepend(cardElement);
  newPlaceformValidator.resetValidation();
}

profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = profileUserInfo.getUserInfo();
  const inputFields = editPopup.getInputValues()
  inputFields.form__name.setAttribute("value", currentUserInfo.name);
  inputFields.form__role.setAttribute("value", currentUserInfo.role);
  editPopup.open();
});

profileAddBtn.addEventListener("click", () => {
  newPlaceformValidator.resetValidation();
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
