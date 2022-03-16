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
  avatarSelector,
  profileAddBtn,
  profileEditBtn,
  profileImage,
  imagePopupSelector,
  gallerySelector,
  userName,
  userRole,
  inputName,
  inputRole,
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
const editProfileImgPopup = new PopupWithForm(
  "#editProfileImage",
  handleEditProfileImage
);
const editPopup = new PopupWithForm("#editProfile", handleProfileFormSubmit);
const confirmDeletePopUp = new PopupWithSubmit("#confirmDelete");
const imagePopup = new PopupWithImage(imagePopupSelector);
const profileUserInfo = new UserInfo({
  nameSelector,
  roleSelector,
  avatarSelector,
});

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
imagePopup.setEventListeners();

const createCard = (item) => {
  const ownerId = item.ownerId ? item.ownerId : item.owner._id;
  const text = item.name;
  const image = item.link;
  let likesNum = item.likes.length;
  const id = item._id;
  let likedBolVal = false;
  item.likes.forEach((user) => {
    if (user._id === userId) {
      likedBolVal = true;
      return likedBolVal;
    }
  });

  const handleCardClick = (imagePopup) => {
    imagePopup.open(image, text);
  };
  
  const card = new Card(
    {
      likedBolVal,
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
          api
            .confirmDelete(id)
            .then((res) => {
              card.deleteDomCard();
              confirmDeletePopUp.close();
            })
            .catch(console.log);
        });
      },
      handleLike: (card) => {
        handleLike(card);
      },
      handleDeleteLike: (card) => {
        handleDeleteLike(card);
      },
    },

    "#card-template",
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
};

let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([resUser, resCards]) => {
    userId = resUser._id;
    const cards = Array.from(resCards);
    cards.forEach((card) => {
      gallery.addItem(createCard(card));
    });
    profileUserInfo.setUserInfo(resUser);
  })
  .catch(console.log);

function handleProfileFormSubmit() {
  const inputFields = editPopup.getInputValues();
  api
    .editUserInfo(inputFields)
    .then((res) => {
      editPopup.close();
      profileUserInfo.setUserInfo(res);
    })
    .catch(console.log)
    .finally(() => {
      editPopup.renderLoading(false);
    });
}

function handleCardFormSubmit() {
  const inputFields = addPopup.getInputValues();
  const text = inputFields.form__title;
  const image = inputFields.form__imageLink;
  const item = {};
  item.name = text;
  item.link = image;
  api
    .postNewCard(text, image)
    .then((res) => {
      item.ownerId = res.owner._id;
      item._id = res._id;
      item.likes = res.likes;
      gallery.addItem(createCard(item));
      addPopup.close();
    })
    .catch(console.log)
    .finally(() => {
      addPopup.renderLoading(false)
    });
}

function handleEditProfileImage() {
  const inputLinkField = editProfileImgPopup.getInputValues();
  const link = inputLinkField.form__imageLink;
  api
    .editAvatarImage(link)
    .then((res) => {
      editProfileImgPopup.close();
      profileUserInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfileImgPopup.renderLoading(false);
    });
}

function handleLike(card) {
  api
    .likeCard(card.getId())
    .then((res) => {
      card.updateLikes(res.likes.length);
      card.toggleLikeButton();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteLike(card) {
  api
    .deleteLike(card.getId())
    .then((res) => {
      card.updateLikes(res.likes.length);
      card.toggleLikeButton();
    })
    .catch((err) => {
      console.log(err);
    });
}

profileEditBtn.addEventListener("click", () => {
  formValidators["edit__form"].resetValidation();
  const userData = profileUserInfo.getUserInfo();
  inputName.setAttribute("value", userData.name);
  inputRole.setAttribute("value", userData.role);
  editPopup.open();
});

profileAddBtn.addEventListener("click", () => {
  formValidators["add__form"].resetValidation();
  addPopup.open();
});

editProfileImage.addEventListener("click", () => {
  formValidators["editProfileImage__form"].resetValidation();
  editProfileImgPopup.open();
});
