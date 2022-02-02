const popupImage = document.querySelector("#imagePopUp");
const popupCloseButton = document.querySelector(".popup__exit-btn");

const imageFile = document.querySelector(".popup__imagePopUp");
const imageText = document.querySelector(".popup__imagePopUp-text");


export default class Card {
  constructor(data, cardSelector) {
    this._text = data.text;
    this._image = data.image;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__image").src = this._image;
    this._element.querySelector(".elements__text").textContent = this._text;
    return this._element;
  }

  _setEventListeners() {
    const elementLikeBtn = this._element.querySelector(".elements__like-btn");
    const deleteTrashBtn = this._element.querySelector(".elements__delete-icon");
    this._element.addEventListener("click", (e) => {
      this._handleImagePopup(e);
    });
    popupCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    });

    elementLikeBtn.addEventListener("click", (e) => {
        this._handleLikeToggle(e);
    })

    deleteTrashBtn.addEventListener("click", (e)=> {
        e.target.closest(".elements__element").remove();
    })
  }

  _handleLikeToggle(e) {
    e.target.classList.toggle("elements__svg-heart_liked");
  }

  _handleImagePopup(e) {
    imageFile.src = e.target.src;
    imageText.textContent =
      e.target.nextElementSibling.nextElementSibling.textContent;
    imageFile.alt = "view of " + imageText.textContent;
    popupImage.classList.add("popup_active");
    document.addEventListener("keydown", this._escapeKey.bind(this));
  }


  _handleClosePopup() {
    imageFile.src = "";
    imageFile.alt = "";
    popupImage.classList.remove("popup_active");
    document.removeEventListener("keydown", this._escapeKey);
  } 

  _escapeKey(e) {
    e.key === "Escape" ? this._handleClosePopup.call() : null;
  }
}




