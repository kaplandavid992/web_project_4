import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._formPopupElement = this._popupElement.querySelector(".popup__form");
    this._submitBtn = this._formPopupElement.querySelector(
      ".popup__form-submit-btn"
    );
    this._inputList =
      this._formPopupElement.querySelectorAll(".popup__form-input");
    this._submitHandler = submitHandler;
    this._initialText = this._submitBtn.textContent;
  }

  getInputValues() {
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
      this.renderLoading(true);
      this._submitHandler();
    });
  }

  
  renderLoading(isLoading, loadingText='Saving...') {
    if (isLoading) {
      this._submitBtn.diabled = true;
      this._submitBtn.textContent = loadingText;
      this._submitBtn.setAttribute("style", "cursor:not-allowed");
    } else {
      this._submitBtn.diabled = false;
      this._submitBtn.textContent = this._initialText;
      this._submitBtn.setAttribute("style", "cursor:pointer");
    }
  }

  getBtn(){
    return this._submitBtn;
  }

  close() {
    super.close();
    this._formPopupElement.reset();
  }
}
