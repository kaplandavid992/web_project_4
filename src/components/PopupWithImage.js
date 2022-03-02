import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ imagePopupSelector, image, text }) {
    super(imagePopupSelector);
    this._image = image;
    this._text = text;
    this._popupImage = document.querySelector(imagePopupSelector);
    this._imageFile = this._popupImage.querySelector(".popup__imagePopUp");
    this._imageText = this._popupImage.querySelector(".popup__imagePopUp-text");
  }

  generateImagePopup = () => {
    this._imageFile.src = this._image;
    this._imageText.textContent = this._text;
    this._imageFile.alt = `view of ${this._text}`;
  };
}
