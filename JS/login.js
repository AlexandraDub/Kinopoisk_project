loginForm.addEventListener('submit', submitLoginForm)
function submitLoginForm(event) {
    event.preventDefault()
    const loginData = new FormData(loginForm)

    loginAndGetSessionId(loginData.get('username'), loginData.get('password'))
        .then(sessionId => {
            if (sessionId === null) {
                alert("Incorrect username or password")
                // TODO show error message
            } else {
                localStorage.setItem('my_star_wars_session_id', sessionId)
                window.location.href='main_page.html'
            }
        })
}