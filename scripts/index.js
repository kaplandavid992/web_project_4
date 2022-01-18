import { resetValidation } from "./validate.js";

const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const popupExitBtns = document.querySelectorAll(".popup__exit-btn");
const popupList = document.querySelectorAll(".popup");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".elements__list");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");
const profilePopUp = document.querySelector("#editProfile");
const editForm = document.querySelector("#editProfileForm");
const inputName = editForm.querySelector("#inputName");
const inputRole = editForm.querySelector("#inputRole");
const addImagePopUp = document.querySelector("#addImage");
const createPlaceForm = document.querySelector("#createNewPlaceForm");
const imagePopUp = document.querySelector("#imagePopUp");
const imageFile = document.querySelector(".popup__imagePopUp");
const imageText = document.querySelector(".popup__imagePopUp-text");
const inputTitle = createPlaceForm.querySelector("#inputTitle");
const inputLink = createPlaceForm.querySelector("#inputLink");

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

function createCard(card) {
  const clonedCard = cardTemplate.content
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardImage = clonedCard.querySelector(".elements__image");
  cardImage.src = card.link;
  cardImage.alt = "nice view of " + card.name;
  clonedCard.querySelector(".elements__text").textContent = card.name;
  const svgHeartBtn = clonedCard.querySelector(".elements__like-btn");
  const deleteIcon = clonedCard.querySelector(".elements__delete-icon");
  svgHeartBtn.addEventListener("click", toggleLikeBtn);
  deleteIcon.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", imagePopUpAction);
  return clonedCard;
}

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

function togglePopup(popUpElement) {
  popUpElement.classList.toggle("popup_active");
}

function editProfileFormDisplay() {
  togglePopup(profilePopUp);
}

function addImageFormDisplay() {
  togglePopup(addImagePopUp);
}

function imagePopUpAction(e) {
  imageFile.src = e.target.src;
  imageText.textContent =
    e.target.nextElementSibling.nextElementSibling.textContent;
  imageFile.alt = "view of " + imageText.textContent;
  togglePopup(imagePopUp);
}

initialCards.forEach((card) => {
  insertCard(createCard(card));
});

function submitProfileForm(e) {
  profileName.textContent = inputName.value;
  profileRole.textContent = inputRole.value;
  e.preventDefault();
  togglePopup(profilePopUp);
}

function submitNewPlaceForm(e) {
  const newCard = { name: inputTitle.value, link: inputLink.value };
  prependCard(createCard(newCard));
  inputTitle.value = "";
  inputLink.value = "";
  e.preventDefault();
  togglePopup(addImagePopUp);
}

profileEditBtn.addEventListener("click", editProfileFormDisplay);
profileAddBtn.addEventListener("click", addImageFormDisplay);

[...popupExitBtns].forEach((btn) =>
  btn.addEventListener("click", function () {
    resetValidation(btn.nextElementSibling);
    togglePopup(btn.closest(".popup"));
  })
);

[...popupList].forEach(function (popup) {
  const popupWindow = popup.querySelector(".popup__window");
  popupWindow.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  popup.addEventListener("click", function (e) {
    togglePopup(e.target);
  });
});

window.addEventListener("keydown", function (e) {
  const thisPopup = document.querySelector(".popup_active");
  if (e.key === "Escape") {
    togglePopup(thisPopup);
  }
});

document
  .querySelector("#editProfileForm")
  .addEventListener("submit", submitProfileForm);
document
  .querySelector("#createNewPlaceForm")
  .addEventListener("submit", submitNewPlaceForm);
