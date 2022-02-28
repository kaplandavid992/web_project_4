export default class Card {
  constructor({text,image, handleCardClick}, templateSelector) {
    this._text = text;
    this._image = image;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
    });

    elementLikeBtn.addEventListener("click", () => {
        this._handleLikeToggle();
    })

    deleteTrashBtn.addEventListener("click", ()=> {
       this._handleDeleteCard();
    })
  }


  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeToggle() {
    this._element.querySelector(".elements__like-btn")
    .classList.toggle("elements__svg-heart_liked");
  }

}




