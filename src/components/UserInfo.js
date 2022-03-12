export default class UserInfo {
  constructor({ nameSelector, roleSelector }) {
    this._nameSelector = nameSelector;
    this._roleSelector = roleSelector;
    this._profileName = document.querySelector(this._nameSelector);
    this._profileRole = document.querySelector(this._roleSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._profileName.textContent;
    userData.role = this._profileRole.textContent;
    return userData;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.form__name;
    this._profileRole.textContent = data.form__role;
  }
}


