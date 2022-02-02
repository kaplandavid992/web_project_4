import { resetValidation } from "./validate.js";
import Card from "./Card.js";

const editProfileForm = document.querySelector("#editProfileForm");
const createNewPlaceForm = document.querySelector("#createNewPlaceForm");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const popupList = document.querySelectorAll(".popup");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".elements__list");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");
const profilePopUp = document.querySelector("#editProfile");
const inputName = editProfileForm.querySelector("#inputName");
const inputRole = editProfileForm.querySelector("#inputRole");
const addImagePopUp = document.querySelector("#addImage");
const imagePopUp = document.querySelector("#imagePopUp");
const imageFile = document.querySelector(".popup__imagePopUp");
const imageText = document.querySelector(".popup__imagePopUp-text");
const inputTitle = createNewPlaceForm.querySelector("#inputTitle");
const inputLink = createNewPlaceForm.querySelector("#inputLink");

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

// function createCard(card) {
//   const clonedCard = cardTemplate.content
//     .querySelector(".elements__element")
//     .cloneNode(true);
//   const cardImage = clonedCard.querySelector(".elements__image");
//   cardImage.src = card.link;
//   cardImage.alt = "nice view of " + card.name;
//   clonedCard.querySelector(".elements__text").textContent = card.name;
//   const svgHeartBtn = clonedCard.querySelector(".elements__like-btn");
//   const deleteIcon = clonedCard.querySelector(".elements__delete-icon");
//   svgHeartBtn.addEventListener("click", toggleLikeBtn);
//   deleteIcon.addEventListener("click", deleteCard);
//   cardImage.addEventListener("click", openImagePopup);
//   return clonedCard;
// }
const card = new Card({ text:"example", image: "https://code.s3.yandex.net/web-code/yosemite.jpg" } , "#card-template");
const cardElement = card.generateCard();
document.querySelector(".elements__list").append(cardElement);


function deleteCard(e) {
  e.target.closest(".elements__element").remove();
}

function toggleLikeBtn(e) {
  e.target.classList.toggle("elements__svg-heart_liked");
}

function insertCard(card) {
  cardsList.appendChild(card);
}

function prependCard(card) {
  cardsList.prepend(card);
}

function escapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_active");
    openedPopup ? closePopup(openedPopup) : null;
  }
}

function openPopup(popUpElement) {
  popUpElement.classList.add("popup_active");
  if (popUpElement.classList.contains("popup_active")) {
    document.addEventListener("keydown", escapeKey);
  }
}

function closePopup(popUpElement) {
  popUpElement.classList.remove("popup_active");
  document.removeEventListener("keydown", escapeKey);
}

function toggleProfileForm() {
  openPopup(profilePopUp);
  resetValidation(editProfileForm);
}

function toggleAddImageForm() {
  openPopup(addImagePopUp);
  resetValidation(createNewPlaceForm);
}

function openImagePopup(e) {
  imageFile.src = e.target.src;
  imageText.textContent =
    e.target.nextElementSibling.nextElementSibling.textContent;
  imageFile.alt = "view of " + imageText.textContent;
  openPopup(imagePopUp);
}

// initialCards.forEach((card) => {
//   insertCard(createCard(card));
// });

function submitProfileForm(e) {
  profileName.textContent = inputName.value;
  profileRole.textContent = inputRole.value;
  e.preventDefault();
  closePopup(profilePopUp);
}

function submitNewPlaceForm(e) {
  const newCard = { name: inputTitle.value, link: inputLink.value };
  prependCard(createCard(newCard));
  closePopup(addImagePopUp);
  inputTitle.value = "";
  inputLink.value = "";
  e.preventDefault();
}

[...popupList].forEach(function (popup) {
  popup.addEventListener("mousedown", function (e) {
    if (
      e.target.classList.contains("popup_active") ||
      e.target.classList.contains("popup__exit-icon")
    ) {
      closePopup(popup);
    }
  });
});

profileEditBtn.addEventListener("click", toggleProfileForm);
profileAddBtn.addEventListener("click", toggleAddImageForm);
editProfileForm.addEventListener("submit", submitProfileForm);
createNewPlaceForm.addEventListener("submit", submitNewPlaceForm);
