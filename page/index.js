// import { openPopup, closePopup } from "../components/utils.js";
import { initialCards } from "../components/cardsList.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
// import FormValidator from "../components/FormValidator.js.js";
const cardListSelector = ".elements__list";
 //const cardsElementsList = document.querySelector(".elements__list");

// const editProfileForm = document.querySelector("#editProfileForm");
// const createNewPlaceForm = document.querySelector("#createNewPlaceForm");
// const profileEditBtn = document.querySelector(".profile__edit-btn");
// const profileAddBtn = document.querySelector(".profile__add-btn");
// const profileName = document.querySelector(".profile__name");
// const profileRole = document.querySelector(".profile__role");
// const profilePopUp = document.querySelector("#editProfile");
// const inputName = editProfileForm.querySelector("#inputName");
// const inputRole = editProfileForm.querySelector("#inputRole");
// const addImagePopUp = document.querySelector("#addImage");
// const inputTitle = createNewPlaceForm.querySelector("#inputTitle");
// const inputLink = createNewPlaceForm.querySelector("#inputLink");
// const popupList = document.querySelectorAll(".popup");

// const settings = {
//   inputSelector: ".popup__form-input",
//   submitButtonSelector: ".popup__form-submit-btn",
//   inactiveButtonClass: "popup__form-submit-btn_inactive",
//   inputErrorClass: "popup__form-errorMsg",
//   errorClass: "popup__form-errorMsg_active",
// };

// initialCards.forEach((item) => {
//   const card = new Card(
//     { text: item.name, image: item.link },
//     "#card-template"
//   );
//   const cardElement = card.generateCard();
//   cardsElementsList.append(cardElement);
// });

// const profileFormValidator = new FormValidator(settings, editProfileForm);
// profileFormValidator.enableValidation();
// const newPlaceformValidator = new FormValidator(settings, createNewPlaceForm);
// newPlaceformValidator.enableValidation();

// [...popupList].forEach( function(popup) {
//   const popupCloseButton = document.querySelector(".popup__exit-btn");
//   popup.addEventListener("click", function (e) {
//     if (
//       e.target.classList.contains("popup_active") ||
//       e.target.classList.contains("popup__exit-icon")
//     ) {
//       closePopup(popup);
//     }
//   });
// });

// function openProfileForm() {
//   openPopup(profilePopUp);
//   inputName.value = profileName.textContent;
//   inputRole.value = profileRole.textContent;
//   profileFormValidator.resetValidation();
// }

// function openAddImageForm() {
//   openPopup(addImagePopUp);
// }

// function submitProfileForm(e) {
//   e.preventDefault();
//   profileName.textContent = inputName.value;
//   profileRole.textContent = inputRole.value;
//   closePopup(profilePopUp);
// }

// function submitNewPlaceForm(e) {
//   e.preventDefault();
//   const card = new Card(
//     { text: inputTitle.value, image: inputLink.value },
//     "#card-template"
//   );
//   const cardElement = card.generateCard();
//   cardsElementsList.prepend(cardElement);
//   closePopup(addImagePopUp);
//   inputTitle.value = "";
//   inputLink.value = "";
// }

// profileEditBtn.addEventListener("click", openProfileForm);
// profileAddBtn.addEventListener("click", openAddImageForm);
// editProfileForm.addEventListener("submit", submitProfileForm);
// createNewPlaceForm.addEventListener("submit", submitNewPlaceForm);


//////////////////////////////////

const cardsList = new Section({
    data: initialCards,
    renderer: (item) => {
      const card = new Card({text:item.name, image: item.link },
                              "#card-template");
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }
  },
  cardListSelector
); 

cardsList.renderer();