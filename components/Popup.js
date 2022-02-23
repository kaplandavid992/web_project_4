export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
  }

  open = () => {
    this.popupElement.classList.add("popup_active");
  }

  close = () => {
    this.popupElement.classList.remove("popup_active");
  }

  _handleEscClose = (evt) => {
    if (
      evt.key === "Escape" &&
      this.popupElement.classList.contains("popup_active")
    ) {
        
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    const popupCloseButton = this.popupElement.querySelector(".popup__exit-btn");
    this.popupElement.addEventListener("click", this.close);
    popupCloseButton.addEventListener("click", this.close);
  }
}
