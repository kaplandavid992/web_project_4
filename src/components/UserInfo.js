export default class UserInfo {
  constructor({ name, role }) {
    this._nameSelector = name;
    this._roleSelector = role;
    this._profileName = document.querySelector(this._nameSelector);
    this._profileRole = document.querySelector(this._roleSelector);
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
    this._inputName.setAttribute("value", this._nameSelector.value);
    this._inputRole.setAttribute("value", this._roleSelector.value);
    this._profileName.textContent = this._inputName.value;
    this._profileRole.textContent = this._inputRole.value;
  }
}
