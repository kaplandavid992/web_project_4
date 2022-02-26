export default class UserInfo {
  constructor({ name, role }) {
    this._name = name;
    this._role = role;
    this._profileName = document.querySelector(".profile__name");
    this._profileRole = document.querySelector(".profile__role");
    this._inputName = document.querySelector("#inputName");
    this._inputRole = document.querySelector("#inputRole");
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._profileName.textContent;
    userData.role = this._profileRole.textContent;
    return userData;
  }

  setUserInfo() {
    this._inputName.setAttribute("value", this._name);
    this._inputRole.setAttribute("value", this._role);
    this._profileName.textContent = this._name;
    this._profileRole.textContent = this._role;
  }
}
