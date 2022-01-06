let profileEditBtn = document.querySelector(".profile__edit-btn");
let profileAddBtn = document.querySelector(".profile__add-btn");
let popupExitBtn = document.querySelector(".popup__exit-btn");
let popup = document.querySelector(".popup");
let popUpWindow = document.querySelector(".popup__window");
let formTemplate = document.querySelector("#form-template");
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

const formValues = [
  {
    header: "Edit profile",
    inputPlaceholderA: "Name",
    inputNameA: "form__name",
    inputAvalue: profileName.textContent,
    inputPlaceholderB: "About me",
    inputNameB: "form__role",
    inputBvalue: profileRole.textContent,
    submitBtnTxt: "Save",
    id: "editProfile",
    classModifier: "editProfile",
  },
  {
    header: "Create place",
    inputPlaceholderA: "Title",
    inputNameA: "form__title",
    inputAvalue: "",
    inputPlaceholderB: "Image link",
    inputNameB: "form__imageLink",
    inputBvalue: "",
    submitBtnTxt: "Create",
    id: "addImage",
    classModifier: "addImage",
  },
];

function createCard(card) {
  const clonedCard = cardTemplate.content
    .querySelector(".elements__element")
    .cloneNode(true);
  clonedCard.querySelector(".elements__image").src = card.link;
  clonedCard.querySelector(".elements__text").textContent = card.name;
  const svgHeartBtn = clonedCard.querySelector(".elements__like-btn");
  svgHeartBtn.addEventListener("click", toggleLikeBtn);
  console.log(svgHeartBtn);
  return clonedCard;
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

function createForm(form) {
  globalThis.clonedForm = formTemplate.content
    .querySelector(".popup__form")
    .cloneNode(true);
  clonedForm.classList.add(`popup__form_${form.classModifier}`); 
  clonedForm.querySelector(".popup__form-header").textContent = form.header;
  clonedForm.querySelector("#inputA").placeholder = form.inputPlaceholderA;
  clonedForm.querySelector("#inputA").name = form.inputNameA;
  clonedForm.querySelector("#inputA").value = form.inputAvalue;
  clonedForm.querySelector("#inputB").placeholder = form.inputPlaceholderB;
  clonedForm.querySelector("#inputB").name = form.inputNameB;
  clonedForm.querySelector("#inputB").value = form.inputBvalue;
  clonedForm.id = form.id;
  clonedForm.querySelector(".popup__form-submit-btn").textContent = form.submitBtnTxt;
  clonedForm.addEventListener("submit", submitForm);
  return clonedForm;
}

function insertForm(form) {
  popUpWindow.appendChild(form);
}

function togglePopupDisplay() {
  popup.classList.toggle("popup_active");
}

function exitForm() {
  togglePopupDisplay();
}

function editProfile() {
  document.querySelector(".popup__form") === null ? null : popUpWindow.lastChild.remove();
  insertForm(createForm(formValues[0]));
  togglePopupDisplay();
}

function addImage() {
  document.querySelector(".popup__form") === null ? null : popUpWindow.lastChild.remove();
  insertForm(createForm(formValues[1]));
  togglePopupDisplay();
}

initialCards.forEach((card) => {
  insertCard(createCard(card));
});


function submitForm(e) {
  function saveForm() {
    const inputA = clonedForm.querySelector("#inputA");
    const inputB = clonedForm.querySelector("#inputB");
    profileName.textContent = inputA.value;
    profileRole.textContent = inputB.value;
  }

  function addImageCreate() {
    const inputA = clonedForm.querySelector("#inputA");
    const inputB = clonedForm.querySelector("#inputB");
    let newCard = { name: inputA.value , link:inputB.value, } 
    prependCard(createCard(newCard));
  }
  
  clonedForm.id === "editProfile" ? saveForm() : addImageCreate();
  e.preventDefault();
  exitForm();
}

profileEditBtn.addEventListener("click", editProfile);
profileAddBtn.addEventListener("click", addImage);
popupExitBtn.addEventListener("click", exitForm);





