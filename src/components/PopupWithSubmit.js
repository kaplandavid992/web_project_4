import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formPopupElement = this._popupElement.querySelector(".popup__form");
  }

  deleteAction(action){
    this._submitHandler = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formPopupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler();
    });
  }
}
