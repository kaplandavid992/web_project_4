export default class UserInfo {
  constructor({ nameSelector, roleSelector, avatarSelector, userId }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileRole = document.querySelector(roleSelector);
    this._avatarImage = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._profileName.textContent;
    userData.role = this._profileRole.textContent;
    return userData;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileRole.textContent = data.about;
    this._avatarImage.src = data.avatar;
  }
}
