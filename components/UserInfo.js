class UserInfo {
    constructor({name, role}){
        this._name = name;
        this._role = role;
    }

    getUserInfo(){
        const userData = {};
        userData.name = this._name;
        userData.role = this._role;
        return userData;
    }

    setUserInfo(){
        which takes new user data and adds it on the page.(loose couple Section in index js)
    }
}