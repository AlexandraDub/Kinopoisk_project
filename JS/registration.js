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
    console.log(userData.get('email'))
    // TODO validate
    if (userData.get('password') != userData.get('repeatPassword')){
        alert('Password must be the same with you')
        return
    }
    if (checkIfUserExist(userData.get('username'))){
        // TODO error message: User already exist, chose another username
        alert('User already exist, create another username')
        return
    }
    newUser(userData.get('username'), userData.get('password'), userData.get('email'))
}
