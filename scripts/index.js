const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const popupExitBtn = document.querySelectorAll(".popup__exit-btn");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".elements__list");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");

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

function togglePopup(popUpElement) {
  popUpElement.style.display = "flex";
  popUpElement.classList.toggle("popup_active");
}

function editProfileFormDisplay() {
  const popUpElement = document.querySelector("#editProfile");
  togglePopup(popUpElement);
}

function addImageFormDisplay() {
  const popUpElement = document.querySelector("#createNewPlaceCardForm");
  togglePopup(popUpElement);
}

function imagePopUp(e) {
  const imageFile = document.querySelector(".popup__imagePopUp");
  const imageText = document.querySelector(".popup__imagePopUp-text");
  imageFile.src = e.target.src;
  imageText.textContent =
    e.target.nextElementSibling.nextElementSibling.textContent;
  imageFile.alt = "view of " + imageText.textContent;
  const popUpElement = document.querySelector("#imagePopUp");
  togglePopup(popUpElement);
}

initialCards.forEach((card) => {
  insertCard(createCard(card));
});

function submitProfileForm(e) {
  const editForm = e.target;
  const popUpElement = e.target.parentNode.parentNode;
  const inputName = editForm.querySelector("#inputName");
  const inputRole = editForm.querySelector("#inputRole");
  profileName.textContent = inputName.value;
  profileRole.textContent = inputRole.value;
  e.preventDefault();
  togglePopup(popUpElement);
}

function submitNewPlaceForm(e) {
  const createPlaceForm = e.target;
  const popUpElement = e.target.parentNode.parentNode;
  let inputTitle = createPlaceForm.querySelector("#inputTitle");
  let inputLink = createPlaceForm.querySelector("#inputLink");
  let newCard = { name: inputTitle.value, link: inputLink.value };
  prependCard(createCard(newCard));
  inputTitle.value = "";
  inputLink.value = "";
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
