import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(imagePopupSelector) {
    super(imagePopupSelector);
    this._imageFile = this._popupElement.querySelector(".popup__imagePopUp");
    this._imageText = this._popupElement.querySelector(
      ".popup__imagePopUp-text"
    );
  }

  open = (image, text) => {
    this._imageFile.src = image;
    this._imageText.textContent = text;
    this._imageFile.alt = `view of ${text}`;
    super.open();
  };
}
