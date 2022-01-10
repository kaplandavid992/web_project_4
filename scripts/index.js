const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const popupExitBtn = document.querySelectorAll(".popup__exit-btn");
const forms = document.querySelectorAll(".popup__form");
const popup = document.querySelector(".popup");
const popUpWindow = document.querySelector(".popup__window");

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".elements__list");
let profileName = document.querySelector(".profile__name");
let profileRole = document.querySelector(".profile__role");

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
  clonedCard.querySelector(".elements__image").src = card.link;
  clonedCard.querySelector(".elements__text").textContent = card.name;
  const svgHeartBtn = clonedCard.querySelector(".elements__like-btn");
  const deleteIcon = clonedCard.querySelector(".elements__delete-icon");
  svgHeartBtn.addEventListener("click", toggleLikeBtn);
  deleteIcon.addEventListener("click", deleteCard);
  const cardImage = clonedCard.querySelector(".elements__image");
  cardImage.addEventListener("click", imagePopUp);
  return clonedCard;
}

function deleteCard(e) {
  e.target.parentNode.remove();
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

function insertForm(form) {
  popup.appendChild(form);
}

function togglePopup(popUpElement) {
  popUpElement.classList.toggle("popup_active");
}

function editProfileFormDisplay() {
  const popUpElement = document.querySelector("#editProfileForm");
  togglePopup(popUpElement);
}

function addImageFormDisplay() {
  const popUpElement = document.querySelector("#createNewPlaceCardForm");
  togglePopup(popUpElement);
}

function imagePopUp(e) {
  document.querySelector(".popup__imagePopUp").src = e.target.src;
  document.querySelector(".popup__imagePopUp-text").textContent =
    e.target.nextElementSibling.nextElementSibling.textContent;
  const popUpElement = document.querySelector("#imagePopUp");
  togglePopup(popUpElement);
}

initialCards.forEach((card) => {
  insertCard(createCard(card));
});

function submitProfileForm(e) {
  const editForm = e.target;
  const popUpElement = e.target.parentNode.parentNode;
  const inputA = editForm.querySelector("#inputA");
  const inputB = editForm.querySelector("#inputB");
  profileName.textContent = inputA.value;
  profileRole.textContent = inputB.value;
  e.preventDefault();
  togglePopup(popUpElement);
}

function submitNewPlaceForm(e) {
  const createPlaceForm = e.target;
  const popUpElement = e.target.parentNode.parentNode;
  let inputA = createPlaceForm.querySelector("#inputA");
  let inputB = createPlaceForm.querySelector("#inputB");
  let newCard = { name: inputA.value, link: inputB.value };
  prependCard(createCard(newCard));
  inputA.value="";
  inputB.value="";
  e.preventDefault();
  togglePopup(popUpElement);
}

profileEditBtn.addEventListener("click", editProfileFormDisplay);
profileAddBtn.addEventListener("click", addImageFormDisplay);
[...popupExitBtn].forEach((btn) =>
  btn.addEventListener("click", function () {
    togglePopup(btn.parentNode.parentNode);
  })
);

document
  .querySelector("#editProfileForm")
  .addEventListener("submit", submitProfileForm);
document
  .querySelector("#createNewPlaceForm")
  .addEventListener("submit", submitNewPlaceForm);
