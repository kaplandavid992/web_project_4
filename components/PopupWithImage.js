class PopupWithImage extends Popup {
    constructor(){
        super(open)
    }

    imageFile.src = this._image;
    imageText.textContent = this._text;
    imageFile.alt = `view of ${this._text}`;
    openPopup(popupImage);
}


//needs to modify open() to fit for image popup-
other than adding _active which open already does it 
needs to add the image and text and alt...
