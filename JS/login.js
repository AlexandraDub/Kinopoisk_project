const errorMessageDiv = document.getElementById('error_message')
// const avaWrapper = document.querySelector('.ava_wrapper')
// const helloToUser = document.querySelector('.user_say_hello')
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
                window.location.href='main_page.html'
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

// function createUserAccountMenu(username, avatar) {
//     helloToUser.innerHTML = `Hi, ${username}!`
// }
//<div class="ava_wrapper"></div>
//<div class="user_say_hello"></div>