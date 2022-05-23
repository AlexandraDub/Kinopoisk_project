const errorMessageDiv = document.getElementById('error_message')

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});



loginForm.addEventListener('submit', submitLoginForm)
function submitLoginForm(event) {
    event.preventDefault()
    const loginData = new FormData(loginForm)

    loginAndGetSessionId(loginData.get('username'), loginData.get('password'))
        .then(sessionId => {
            if (sessionId === null) {
                errorMessageDiv.classList.remove('input__line__under')
                errorMessageDiv.classList.add('error_message')
                errorMessageDiv.innerHTML = 'Incorrect username or password'
            } else {
                localStorage.setItem('my_star_wars_session_id', sessionId)
                window.location.href = 'main_page.html'
                createUserAccountMenu()
            }
        })
}
function deleteErrorMessage() {
    errorMessageDiv.innerHTML = ''
    errorMessageDiv.classList.add('input__line__under')
}
document.querySelectorAll('.login_input').forEach(() => {
    addEventListener('click', deleteErrorMessage)
})

function showExpiredMessage() {
    const expired = params.expired

    if (expired === 'true') {
        errorMessageDiv.classList.remove('input__line__under')
        errorMessageDiv.classList.add('error_message')
        errorMessageDiv.innerHTML = 'Your session has been expired'
    }
}

showExpiredMessage()

