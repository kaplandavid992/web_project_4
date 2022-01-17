
//If any field doesn't pass validation, the "Save" button should be inactive.

 //If both fields pass validation, then they should be active.
 
 //Use the colors from the design for the inactive buttons.

// enabling validation by calling enableValidation()
// pass all the settings on call
// enableValidation({
//     formSelector: ".popup__form",
//     inputSelector: ".popup__form-input",
//     submitButtonSelector: ".popup__button",
//     inactiveButtonClass: "popup__button_disabled",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__error_visible"
//   });

const popupForm = document.querySelector(".popup__form");
const popupFormInput = popupForm.querySelector(".popup__form-input");

  const showInputError = (formElement, inputElement , errorMessage) => {
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
  
  popupForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
  
  popupFormInput.addEventListener("input", function () {
    checkInputValidity(popupForm, popupFormInput);
  });


  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
    inputList.forEach( inputElement => {
        console.log(inputElement);
      inputElement.addEventListener("input", function () {
          checkInputValidity(formElement, inputElement);
      })
    });
  };
    setEventListeners(popupForm);