const errorUser = document.getElementById('error_message_user')
const errorPassword = document.getElementById('error_message_password')

contact.addEventListener('submit', registerNewUser)

function registerNewUser(event) {
    event.preventDefault()

    const userData = new FormData(contact)
    if (userData.get('password') != userData.get('repeatPassword')) {
        errorPassword.classList.remove('input__line__under')
        errorPassword.classList.add('error_message')
        errorPassword.innerHTML = 'Password must be the same with previous'
        return
    }

    checkAvailableUsername(userData.get('username'))
        .then(isAvailable =>
            isAvailable ?
                createNewUserAndRedirect(userData.get('username'), userData.get('password'), userData.get('email')) :
                showErrorMessage()
        )

}

function createNewUserAndRedirect(username, password, email) {
    createNewUser(username, password, email).
        then(() => window.location.href = 'login.html')
}

function showErrorMessage() {
    errorUser.classList.remove('input__line__under')
    errorUser.classList.add('error_message')
    errorUser.innerHTML =  'User already exist'
}
function deleteErrorMessage() {
    errorUser.innerHTML = ''
    errorPassword.innerHTML = ''
    errorUser.classList.add('input__line__under')
    errorPassword.classList.add('input__line__under')
}
document.querySelectorAll('.contact_input').forEach(() => {
    addEventListener('click', deleteErrorMessage)
})