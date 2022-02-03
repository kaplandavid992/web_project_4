export default class FormValidator {
  constructor(settings, formElement) {
    this.formSelector = settings.formSelector;
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
    this.formElement = formElement;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  _resetValidation(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this.inputSelector)
    );
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
    });
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );
    _toggleButtonState(inputList, buttonElement);
  }

  enableValidation() {
      const self = this;
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      const inputList = Array.from(
        formElement.querySelectorAll(this.inputSelector)
      );
      const buttonElement = formElement.querySelector(
        this.submitButtonSelector
      );
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          self._checkInputValidity(formElement, inputElement);
          self._toggleButtonState(inputList, buttonElement);
        });
      });
    });
  }
}
