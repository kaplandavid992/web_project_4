import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._formPopupElement = document.querySelector(popupSelector);
        this._submitHandler = submitHandler;
    }
    // _getInputValues() {

    //     const inputFieldsList = this._formPopupElement.querySelectorAll(".popup__form-input");
    //     inputFieldsList.forEach((input) => { 
    //         const inputName = input.name;
    //         const inputFields = { inputName = input.value }; 
    //     })
    //     return inputFields;
    // }
    

    setEventListeners(){
        this._formPopupElement.addEventListener("submit", this._submitHandler);  
    }

    close(){
        console.log("close");
        // modified to reset form once popup closed
    }

    _submitHandler(){
        this.submitHandler();
        console.log("yes here");
    }
}


//Create an instance of the PopupWithForm class for each popup