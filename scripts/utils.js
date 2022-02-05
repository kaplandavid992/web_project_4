function openPopup(popUpElement) {
  popUpElement.classList.add("popup_active");
  document.addEventListener("keydown", escapeKey);
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

export { openPopup, closePopup };
