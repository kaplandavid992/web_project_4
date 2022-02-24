import { initialCards } from "../components/cardsList.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js"
import Section from "../components/Section.js";



const cardsElementsList = document.querySelector(".elements__list");
// const editProfileForm = document.querySelector("#editProfileForm");
// const createNewPlaceForm = document.querySelector("#createNewPlaceForm");
const cardListSelector = ".elements__list";
 const profileName = document.querySelector(".profile__name");
 const profileRole = document.querySelector(".profile__role");
// const profilePopUp = document.querySelector("#editProfile");
// const inputName = editProfileForm.querySelector("#inputName");
// const inputRole = editProfileForm.querySelector("#inputRole");
// const addImagePopUp = document.querySelector("#addImage");
// const inputTitle = createNewPlaceForm.querySelector("#inputTitle");
// const inputLink = createNewPlaceForm.querySelector("#inputLink");
const popupList = document.querySelectorAll(".popup");



const settings = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-btn",
  inactiveButtonClass: "popup__form-submit-btn_inactive",
  inputErrorClass: "popup__form-errorMsg",
  errorClass: "popup__form-errorMsg_active",
};

const profileFormValidator = new FormValidator(settings, editProfileForm);
profileFormValidator.enableValidation();
const newPlaceformValidator = new FormValidator(settings, createNewPlaceForm);
newPlaceformValidator.enableValidation();



// function openProfileForm() {
//   openPopup(profilePopUp);
//   inputName.value = profileName.textContent;
//   inputRole.value = profileRole.textContent;
//   profileFormValidator.resetValidation();
// }

// function openAddImageForm() {
//   openPopup(addImagePopUp);
// }

// editProfileForm.addEventListener("submit", submitProfileForm);
// createNewPlaceForm.addEventListener("submit", submitNewPlaceForm);

//////////////////////////////////

const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");

const submitProfileHandler = () => {
    profileName.textContent = inputName.value;
    profileRole.textContent = inputRole.value;
}

const submitAddHandler = () => {
  const card = new Card(
    { text: inputTitle.value, image: inputLink.value },
    "#card-template"
  );
  const cardElement = card.generateCard();
  cardsElementsList.prepend(cardElement);
  inputTitle.value = "";
  inputLink.value = "";
}


profileEditBtn.addEventListener("click", () => { 
  const editPopup = new PopupWithForm("#editProfile", submitProfileHandler);
  editPopup.open();
  editPopup.setEventListeners();
 })

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
