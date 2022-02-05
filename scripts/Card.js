import { openPopup } from "./utils.js"

const popupImage = document.querySelector("#imagePopUp");
const imageFile = popupImage.querySelector(".popup__imagePopUp");
const imageText = popupImage.querySelector(".popup__imagePopUp-text");

export default class Card {
  constructor(data, templateSelector) {
    this._text = data.text;
    this._image = data.image;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__image").src = this._image;
    this._element.querySelector(".elements__text").textContent = this._text;
    this._element.querySelector(".elements__image").alt = `view of ${this._text}`;
    return this._element;
  }

  _setEventListeners() {
    const imageCard = this._element.querySelector(".elements__image");
    const elementLikeBtn = this._element.querySelector(".elements__like-btn");
    const deleteTrashBtn = this._element.querySelector(".elements__delete-icon");
    imageCard.addEventListener("click", () => {
      this._handleImagePopup();
    });

    elementLikeBtn.addEventListener("click", (e) => {
        this._handleLikeToggle(e);
    })

    deleteTrashBtn.addEventListener("click", ()=> {
       this._handleDeleteCard();
    })
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeToggle() {
    this._element.lastElementChild.lastElementChild
    .classList.toggle("elements__svg-heart_liked");
  }

  _handleImagePopup() {
    imageFile.src = this._image;
    imageText.textContent = this._text;
    imageFile.alt = `view of ${this._text}`;
    openPopup(popupImage);
  }
}




