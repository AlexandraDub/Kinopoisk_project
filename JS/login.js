//const loginForm = document.getElementById('login_form')
loginForm.addEventListener('submit', submitLoginForm)
function submitLoginForm(event) {

document.cookie = "vova=vova"

    event.preventDefault()
    const loginData = new FormData(loginForm)

    loginAndGetSessionId(loginData.get('username'), loginData.get('password'))
        .then(sessionId => {
            if (sessionId === null) {
                // TODO show error message
            } else {
                console.log('setting cookies')
                document.cookie = "vova=vova"
                document.cookie = `my_star_wars=${sessionId}`
            }
        })
}


