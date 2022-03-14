import "./index.css";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

import {
  settings,
  editProfileImage,
  nameSelector,
  roleSelector,
  profileAddBtn,
  profileEditBtn,
  profileImage,
  imagePopupSelector,
  gallerySelector,
  userName,
  userRole,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { api } from "../components/Api.js";

const gallery = new Section(
  {
    data: [],
    renderer: (item) => {
      gallery.addItem(cardRenderer(item));
    },
  },
  gallerySelector
);

const addPopup = new PopupWithForm("#addImage", handleCardFormSubmit);
const editProfileImgPopup = new PopupWithForm("#editProfileImage", handleEditProfileImage);
const editPopup = new PopupWithForm("#editProfile", handleProfileFormSubmit);
const confirmDeletePopUp = new PopupWithSubmit("#confirmDelete");
const imagePopup = new PopupWithImage(imagePopupSelector);
const profileUserInfo = new UserInfo({ nameSelector, roleSelector });

const formValidators = {};
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);
editPopup.setEventListeners();
addPopup.setEventListeners();
editProfileImgPopup.setEventListeners();
confirmDeletePopUp.setEventListeners();

const cardRenderer = (item) => {
  const ownerId = item.ownerId ? item.ownerId : item.owner._id;
  const text = item.name;
  const image = item.link;
  let likesNum = item.likes.length;
  const id = item._id;
  
  const handleCardClick = (imagePopup) => {
    imagePopup.open(image, text);
  };

  imagePopup.setEventListeners();
  const card = new Card(
    {
      ownerId,
      text,
      image,
      id,
      likesNum,
      handleCardClick: () => {
        handleCardClick(imagePopup);
      },
      openDeleteConfirmPopUp: (id) => {
        confirmDeletePopUp.open();
        confirmDeletePopUp.deleteAction(() => {
          api.confirmDelete(id).then((res) => {
            card.deleteDomCard();
          });
        });
      },
      handleLikeNumber: (id, updateAction) => {
        if (updateAction === "addLike") {
          api.addLike(id).then(
          likesNum += 1);
        } else {
          api.deleteLike(id).then(res => res);
          if (likesNum > 0) {
            likesNum -= 1;
          }
        }
        card.setLikesNum(likesNum);
      },
    },

    "#card-template",
    userId
  );
  const cardElement = card.generateCard();

  return cardElement;
};

let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([resUser, resCards]) => {
    userId = resUser._id;
    const cards = Array.from(resCards);
    cards.forEach((card) => {
      gallery.addItem(cardRenderer(card));
    });
    userName.textContent = resUser.name;
    userRole.textContent = resUser.about;
  }
);

function handleProfileFormSubmit() {
  const inputFields = editPopup.getInputValues();
  profileUserInfo.setUserInfo(inputFields);
  api.editUserInfo(inputFields);
}

function handleCardFormSubmit() {
  const inputFields = addPopup.getInputValues();
  const text = inputFields.form__title;
  const image = inputFields.form__imageLink;
  const item = {};
  item.name = text;
  item.link = image;
  api.postNewCard(text, image).then((res) => {
    item.ownerId = res.owner._id;
    item._id = res._id;
    item.likes = res.likes;
    gallery.addItem(cardRenderer(item));
  });
}

function handleEditProfileImage(){
  const inputLinkField = editProfileImgPopup.getInputValues();
  const link = inputLinkField.form__imageLink;
  api.editAvatarImage(link);
  profileImage.src = link;
}

profileEditBtn.addEventListener("click", () => {
  const currentUserProfile = profileUserInfo.getUserInfo();
  inputName.setAttribute("value", currentUserProfile.name);
  inputRole.setAttribute("value", currentUserProfile.role);
  formValidators["edit__form"].resetValidation();
  editPopup.open();
});

profileAddBtn.addEventListener("click", () => {
  formValidators["add__form"].resetValidation();
  addPopup.open();
});

editProfileImage.addEventListener("click", () => {
  formValidators["editProfileImage__form"].resetValidation();
  editProfileImgPopup.open();
})