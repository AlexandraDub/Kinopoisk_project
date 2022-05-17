//const buttonSubmitForm = document.querySelector('#contact-submit')
//const inputUsername = document.querySelector('#username')
//const inputEmail = document.querySelector('#email')
//const inputPassword = document.querySelector('#password')
//const inputPasswordCheck = document.querySelector('#passwordCheck')
const errorUser = document.querySelector('.username')
const errorEmail = document.querySelector('.email')
const errorPassword = document.querySelector('.password')
const errorNotSame = document.querySelector('.passwordCheck')

contact.addEventListener('submit', registerNewUser)

function registerNewUser(event) {
    event.preventDefault()

    const userData = new FormData(contact)
    // TODO validate
    if (userData.get('password') != userData.get('repeatPassword')) {
        alert('Password must be the same with you')
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
    // TODO show error message 
    alert('User already esist')
}