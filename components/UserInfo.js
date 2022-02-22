class UserInfo {
    constructor({data}){
        this.name = data.name;
        this.role = data.role;
    }

    getUserInfo(){
        returns an object with information about the user. 
        This method will be handy for cases when 
        it's necessary to display the user data in the open form.
    }

    setUserInfo(){
        which takes new user data and adds it on the page.
    }
}