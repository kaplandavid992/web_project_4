
 const imagePopupSelector = "#imagePopUp";
 const cardListSelector = ".elements__list";
 const nameSelector = ".profile__name";
 const roleSelector = ".profile__role";
 const cardsElementsList = document.querySelector(cardListSelector);
 const profileEditBtn = document.querySelector(".profile__edit-btn");
 const profileAddBtn = document.querySelector(".profile__add-btn");
 
 const settings = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-btn",
  inactiveButtonClass: "popup__form-submit-btn_inactive",
  inputErrorClass: "popup__form-errorMsg",
  errorClass: "popup__form-errorMsg_active",
};

 export { roleSelector, nameSelector,  
     settings, cardListSelector,
      profileAddBtn, profileEditBtn, cardsElementsList, imagePopupSelector}


