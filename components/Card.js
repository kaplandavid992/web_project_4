

// const popupImage = document.querySelector("#imagePopUp");
// const imageFile = popupImage.querySelector(".popup__imagePopUp");
// const imageText = popupImage.querySelector(".popup__imagePopUp-text");

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

  _handleCardClick() {
    // imageFile.src = this._image;
    // imageText.textContent = this._text;
    // imageFile.alt = `view of ${this._text}`;
    this.handleCardClick();
  }
}

//Connect the Card class to the popup.
// Make Card take the handleCardClick() function into 
//the constructor. When the user clicks on the card, this
// function will open the popup with an image.




