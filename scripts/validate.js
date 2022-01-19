const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form-errorMsg_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove("popup__form-errorMsg_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__form-submit-btn_inactive");
  } else {
    buttonElement.classList.remove("popup__form-submit-btn_inactive");
  }
};

function enableValidation(settings) {
  const { formSelector, submitButtonSelector, inputSelector } = settings;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
}

const resetValidation = (formElement) => {
  const inputList = formElement.querySelectorAll(".popup__form-input");
  hideInputError(formElement, inputList[0]);
  hideInputError(formElement, inputList[1]);
  if (formElement.id === "editProfileForm") {
    const profileName = document.querySelector(".profile__name");
    const profileRole = document.querySelector(".profile__role");
    inputList[0].value = profileName.textContent;
    inputList[1].value = profileRole.textContent;
  } else {
    inputList[0].value = "";
    inputList[1].value = "";
  }
  const buttonElement = formElement.querySelector(".popup__form-submit-btn");
  buttonElement.classList.contains("popup__form-submit-btn_inactive")
    ? null
    : buttonElement.classList.add("popup__form-submit-btn_inactive");
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit-btn",
  inactiveButtonClass: ".popup__form-submit-btn_inactive",
  inputErrorClass: "popup__form-errorMsg",
  errorClass: "popup__form-errorMsg_active",
});

export { resetValidation };
