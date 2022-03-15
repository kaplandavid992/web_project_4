export default class Card {
  constructor({ likedBolVal, ownerId, text, image, id, likesNum, handleCardClick, openDeleteConfirmPopUp, handleLike, handleDeleteLike}, templateSelector, userId) {
    this._text = text;
    this._image = image;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openDeleteConfirmPopUp = openDeleteConfirmPopUp;
    this._element = this._getTemplate();
    this._imageItem = this._element.querySelector(".elements__image");
    this._textItem = this._element.querySelector(".elements__text");
    this._deleteItem = this._element.querySelector(".elements__delete-icon");
    this._likeNumberItem = this._element.querySelector(".elements__likesNumber");
    this._likeItem = this._element.querySelector(".elements__like-btn");
    this._id = id;
    this._userId = userId;
    this._ownerId = ownerId;
    this._likesNum = likesNum;
    this._likedBolVal = likedBolVal;
    this._handleLike = handleLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._imageItem.src = this._image;
    this._textItem.textContent = this._text;
    this._imageItem.alt = `view of ${this._text}`;
    this._likeNumberItem.textContent = this._likesNum;
    this.setEventListeners();
    this._likedBolVal ? this.toggleLikeButton() : null;
    this._userId === this._ownerId ? null : 
    this._deleteItem.setAttribute("style","display:none"); 
    return this._element;
  }

  setEventListeners() {
    this._imageItem.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._likeItem.addEventListener("click", () => {
      this._likeItem.classList.contains("elements__svg-heart_liked") 
      ? this._handleDeleteLike(this)
      : this._handleLike(this)
    });

    this._deleteItem.addEventListener("click", () => {
      this.openDeleteConfirmPopUp();
    });
  }

  openDeleteConfirmPopUp() {
    this._openDeleteConfirmPopUp(this._id);
  }

  deleteDomCard(){
    this._element.remove();
  }

  getId(){
    return this._id;
  }

  toggleLikeButton(){
    this._likeItem.classList.toggle("elements__svg-heart_liked");
  }

  updateLikes(likesCount){
    this._likeNumberItem.textContent = likesCount;
  }
}

