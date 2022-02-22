class Popup {
    constructor(popupSelector){
        this.popupSelector = popupSelector;
    }
    open(){

    }
    close(){

    }
    _handleEscClose(){
        document.addEventListener("keydown", escapeKey);
        // if (evt.key === "Escape") {
        //     const openedPopup = document.querySelector(".popup_active");
        //     openedPopup ? closePopup(openedPopup) : null;
        //   }
    }
    setEventListeners(){
        const closeButton = document.querySelector(".popup__exit-btn");
        closeButton.addEventlistener("click", () => { this.close() });
        shadedArea.addEventlistener("click", () => { this.close() });
    }
}