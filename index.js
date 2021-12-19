let profileEditBtn = document.querySelector(".profile__edit-btn");
let profileAddBtn = document.querySelector(".profile__add-btn");
let formExitBtn = document.querySelector(".form__exit-btn");

function exitForm() {
  let form = document.querySelector(".form");
  form.setAttribute("style", "display:none");
  let pgBtns = document.querySelectorAll(".button") 
  console.log(pgBtns);
}

function addprofile() {
  let page = document.querySelector(".page");
  let form = page.querySelector(".form");
  let likeBtn = document.querySelector(".elements__like-btn");
  let addBtn = document.querySelector(".profile__add-btn");
  let editBtn = document.querySelector(".profile__edit-btn");

  editBtn.setAttribute("disabled", true);
  addBtn.setAttribute("disabled", true);
  likeBtn.setAttribute("disabled", true);
  form.setAttribute("style", "display:flex");
}

function editprofile() {
    let form = document.querySelector(".form");
    form.setAttribute("style", "display:flex");
    // need to sendthe place holders by current profile
}

profileAddBtn.addEventListener("click", addprofile);
profileEditBtn.addEventListener("click", editprofile);
formExitBtn.addEventListener("click", exitForm);



// let container = document.querySelector('.container');
// let profilesContainer = container.querySelector('.profiles-container');
// let addButton = container.querySelector('.form__submit-btn_action_add');
// let resetButton = container.querySelector('.form__submit-btn_action_reset');

// function renderAdded() {
//   let profiles = profilesContainer.querySelectorAll('.profile');
//   let noprofilesElement = container.querySelector('.no-profiles');

//   if (profiles.length === 0) {
//     resetButton.setAttribute('disabled', true);
//     resetButton.classList.add('form__submit-btn_disabled');
//     noprofilesElement.classList.remove('no-profiles_hidden');
//   } else {
//     resetButton.removeAttribute('disabled');
//     resetButton.classList.remove('form__submit-btn_disabled');
//     noprofilesElement.classList.add('no-profiles_hidden');
//   }
// }

// function addprofile() {
//   let artist = document.querySelector('.input__text_type_artist');
//   let profile = document.querySelector('.input__text_type_profile');

//   profilesContainer.insertAdjacentHTML('beforeend', `
// 		<div class="profile">
//       <span class="profile__name">${artist.value}</span>
//       <p class="profile__role">${profile.value}</p>
// 		  <button class="profile__like"></button>
// 		</div>
//   `);
//    artist.value = "";
//   profile.value = "";
//   renderAdded();
// }


// addButton.addEventListener('click', addprofile);

// renderAdded();
