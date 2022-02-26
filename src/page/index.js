import "./index.css";
import { initialCards } from "../components/cardsList.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

const cardsElementsList = document.querySelector(".elements__list");
const cardListSelector = ".elements__list";
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

profileFormValidator.enableValidation();
newPlaceformValidator.enableValidation();

const submitProfileHandler = () => {
  const name = inputName.value;
  const role = inputRole.value;
  const profileUserInfo = new UserInfo({ name, role });
  profileUserInfo.setUserInfo();
};

const submitAddHandler = () => {
  const card = new Card(
    { text: inputTitle.value, image: inputLink.value },
    "#card-template"
  );
  const cardElement = card.generateCard();
  cardsElementsList.prepend(cardElement);
  inputTitle.setAttribute("value", "");
  inputLink.setAttribute("value", "");
};

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
      const card = new Card(
        {
          text: item.name,
          image: item.link,
          handleCardClick() {
            const imagePopup = new PopupWithImage({
              imagePopupSelector: "#imagePopUp",
              image: item.link,
              text: item.name,
            });
            imagePopup.generateImagePopup();
            imagePopup.setEventListeners();
          },
        },
        "#card-template"
      );
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

cardsList.renderer();
