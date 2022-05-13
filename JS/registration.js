//import {newUserCreateEntry, checkIfUserExist, getUserData} from './local_storage_manager.js'
const buttonSubmitForm = document.querySelector('#contact-submit')
const inputUsername = document.querySelector('#username')
const inputEmail = document.querySelector('#email')
const inputPassword = document.querySelector('#password')
const inputPasswordCheck = document.querySelector('#passwordCheck')
const errorUser = document.querySelector('.username')
const errorEmail = document.querySelector('.email')
const errorPassword = document.querySelector('.password')
const errorNotSame = document.querySelector('.passwordCheck')
//buttonSubmitForm.addEventListener('click', validateForm)

function validateForm() {
    if(input.value < inputPassword.minlenght) {
        errorPassword.textContent = 'your password lenght should be from 4 symbols'
    }
}

contact.onsubmit = registerNewUser
function registerNewUser(event) {
    event.preventDefault()
    let formData = new FormData(contact)

    // validate form data

    console.log('username', formData.get('username'))
    //const userData = {
    //    username: formData.get("username"),
    //    email: formData.get("email"),
    //    password: formData.get("password"),
    //}
    //console.log(userData)

    let isUserExist = checkIfUserExist(formData.get('username'))

    console.log('isUserExist', isUserExist)
    
    if (isUserExist){

        // error message user exist

        return

    }

    newUserCreateEntry(formData)
    let username = getUserData(formData.get('username'))

    console.log('userData', username)



}
//console.log(data);