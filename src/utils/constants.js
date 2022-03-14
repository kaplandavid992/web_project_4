const imagePopupSelector = "#imagePopUp";
const gallerySelector = ".elements__list";
const nameSelector = ".profile__name";
const roleSelector = ".profile__role";
const cardsElementsList = document.querySelector(gallerySelector);
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
const inputName = document.querySelector("#inputName");
const inputRole = document.querySelector("#inputRole");
const userName = document.querySelector(nameSelector);
const userRole = document.querySelector(roleSelector);
const likesNumItem = document.querySelector(".elements__likesNumber");
const editProfileImage = document.querySelector(".profile__imageContainer");
const profileImage = document.querySelector(".profile__image");

const settings = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-btn",
  inactiveButtonClass: "popup__form-submit-btn_inactive",
  inputErrorClass: "popup__form-errorMsg",
  errorClass: "popup__form-errorMsg_active",
  formSelector: ".popup__form",
};

export {
  roleSelector,
  nameSelector,
  inputName,
  inputRole,
  likesNumItem,
  editProfileImage,
  settings,
  gallerySelector,
  userName,
  userRole,
  profileImage,
  profileAddBtn,
  profileEditBtn,
  cardsElementsList,
  imagePopupSelector,
};
