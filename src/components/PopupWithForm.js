import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._formPopupElement = this._popupElement.querySelector(".popup__form");
    this._inputList =
      this._formPopupElement.querySelectorAll(".popup__form-input");
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    const inputFields = {};
    this._inputList.forEach((input) => {
      const key = input.name;
      inputFields[key] = input.value;
    });
    return inputFields;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formPopupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler();
      this.close();
    });
  }

  close() {
    super.close();
    this._formPopupElement.reset();
  }
}
