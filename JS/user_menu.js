const signInButton = document.querySelector('#login')
const loginMenu = document.querySelector('.login')
const loginUserMenu = document.querySelector('.login_user')
const avaWrapper = document.querySelector('.ava_wrapper')
const greeting = document.querySelector('.greeting')

function showUserMenu() {
    loginMenu.classList.add('hidden')
    loginUserMenu.classList.remove('hidden')
    avaWrapper.style.backgroundImage = `url(../Images/reg_avatar/ava${userData.ava}.jpg)`
    greeting.textContent = `May the Force be with you, ${userData.username}!`
}

const settingsButton = document.querySelector('.settings')
settingsButton.addEventListener('click', openDropdownMenu)

function openDropdownMenu(){
    const menu = document.querySelector('.dropdown-menu')
    if(!menu.classList.contains('open')) {
        menu.classList.remove('menu-active')
        menu.classList.remove('open')
        menu.classList.add('menu-active')
        intervalId = setTimeout(() => {
            menu.classList.add('open');
        }, 0);

    }
    if (menu.classList.contains('open')) {
        clearTimeout(intervalId);
        menu.classList.remove('menu-active');
        intervalId = setTimeout(() => {
            menu.classList.remove('open');
        }, 0);
    }
    
}

const logOutButton = document.querySelector('.logout_button')
logOutButton.addEventListener('click', logOut)

function logOut() {
    console.log('log out')
    localStorage.removeItem('my_star_wars_session_id')
    window.location.assign('login.html')
}
