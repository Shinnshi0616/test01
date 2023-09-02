const Auth = {
    isAuth: false,
    login(cb) {
        this.isAuth = true
        setTimeout(cb, 1000)
    }
}
export default Auth;