const popupList = document.querySelectorAll(".popup");
 
 function openPopup(popUpElement) {
    popUpElement.classList.add("popup_active");
    if (popUpElement.classList.contains("popup_active")) {
      document.addEventListener("keydown", escapeKey);
    }
  }
  
  function closePopup(popUpElement) {
    popUpElement.classList.remove("popup_active");
    document.removeEventListener("keydown", escapeKey);
  }

  function escapeKey(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_active");
      openedPopup ? closePopup(openedPopup) : null;
    }
  }

  [...popupList].forEach(function (popup) {
    popup.addEventListener("mousedown", function (e) {
      if (
        e.target.classList.contains("popup_active") ||
        e.target.classList.contains("popup__exit-icon")
      ) {
        closePopup(popup);
      }
    });
  });

  export { openPopup, closePopup }