export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open(){
    this._popupElement.classList.add("popup_active");
  };

  close(){
    this._popupElement.classList.remove("popup_active");
  };

  _handleEscClose = (evt) => {
    if (
      evt.key === "Escape" &&
      this._popupElement.classList.contains("popup_active")
    ) {
      this.close();
    }
  };

  setEventListeners(){
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("popup_active") 
        ||
        e.target.classList.contains("popup__exit-icon")
      ) {
        this.close();
      }
    });
  };
}
