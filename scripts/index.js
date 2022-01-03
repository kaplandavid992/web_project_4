let profileEditBtn = document.querySelector(".profile__edit-btn");
let popupExitBtn = document.querySelector(".popup__exit-btn");
let popupForm = document.querySelector(".popup__form");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector(".popup__form-input_field_name");
let roleInput = document.querySelector(".popup__form-input_field_role");
let profileName = document.querySelector(".profile__name");
let profileRole = document.querySelector(".profile__role");
let cardTemplate = document.querySelector("#card-template");
let cardsList = document.querySelector(".elements__list");

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
  let clonedCard = cardTemplate.content.querySelector(".elements__element").cloneNode(true);
  clonedCard.querySelector(".elements__image").src = card.link;
  clonedCard.querySelector(".elements__text").textContent = card.name;
  return clonedCard;
}

function insertCard(card) {
  cardsList.appendChild(card);
}

function togglePopupDisplay() {
  popup.classList.toggle("popup_active");
}

function exitForm() {
  togglePopupDisplay();
}

function saveForm(e) {
  profileName.textContent = nameInput.value;
  profileRole.textContent = roleInput.value;
  e.preventDefault();
  exitForm();
}

function editProfile() {
  nameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
  togglePopupDisplay();
}

profileEditBtn.addEventListener("click", editProfile);
popupExitBtn.addEventListener("click", exitForm);
popupForm.addEventListener("submit", saveForm);

initialCards.forEach((card) => {
 insertCard(createCard(card));
})