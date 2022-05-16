// function checkIfUserExist(username){
//     return localStorage.getItem(username) != null
// }

// function newUserCreateEntry(formData){

//     const newUser = {}
//     newUser.username = formData.get('username')
//     newUser.password = formData.get('password')
//     newUser.email = formData.get('email')

//     let avaNumber = Math.floor(Math.random() * 18)

//     console.log(avaNumber)

//     newUser.avatar =`ava${avaNumber}`
//     newUser.viewPreferences = 'episode_tile'
//     newUser.filmPreferences = []
//     newUser.characterPreferences = []

//     localStorage.setItem(formData.get('username'), JSON.stringify(newUser))
// }

// function getUserData(username){
//     console.log(username)
//     return JSON.parse(localStorage.getItem(username))
// }

// function existedUserUpdateEntry(formData){
// }

// function getViewPreferences(username){
//     let userData = JSON.parse(localStorage.getItem(username))
//     return userData.viewPreferences
// }

// function updateViewPreferences(username, preference){
//     console.log('UPDATE!')
//     let userData = JSON.parse(localStorage.getItem(username))
//     userData.viewPreferences = preference
//     localStorage.setItem(username, JSON.stringify(userData))
// }

// function addPreferenceFilm(username, episodeId){
//     let userData = JSON.parse(localStorage.getItem(username))
//     if (!userData.filmPreferences.includes(episodeId)){
//         userData.filmPreferences.push(episodeId)
//     }
//     localStorage.setItem(username, JSON.stringify(userData))
// }

// function removePreferenceFilm(username, episodeId){
//     let userData = JSON.parse(localStorage.getItem(username))

//     const index = userData.filmPreferences.indexOf(episodeId);
//     if (index > -1) {
//         userData.filmPreferences.splice(index, 1); 
//     }

//     localStorage.setItem(username, JSON.stringify(userData))
// }

// function getPreferenceFilm(username){
//     let userData = JSON.parse(localStorage.getItem(username))
//     return userData.filmPreferences
// }

// function addPreferenceCharacter(username, characterId){

// }

// function removePreferenceCharacter(username, characterId){

// }

// function getPreferenceCharacter(username){

// }
// //cookie
// // const container = document.querySelector('#container');
// //     function add(value) {
// //         console.log(value);
// //         Cookies.set('my_' + Date.now(), value);
// //         render();
// //     }
// //     function getMyCookies() {
// //         const allData = Cookies.get();
// //         const my_cookies = [];
// //         for (const cookieKey in allData) {
// //             if (cookieKey.startsWith('my_')) {
// //                 my_cookies.push({
// //                     key: cookieKey,
// //                     value: allData[cookieKey]
// //                 });
// //             }
// //         }
// //         return my_cookies;
// //     }
// //     function render() {
// //         const cookies = getMyCookies();
// //         let html = cookies.map(cookie => {
// //             return `<div>
// //                     <button onclick="deleteNote('${cookie.key}')">delete</button>
// //                     ${cookie.value}
// //                 </div>`;
// //         })
// //                 .join('');
// //         container.innerHTML = html;
// //     }
// //     function deleteNote(key) {
// //         Cookies.remove(key);
// //         render();
// //     }
// //     render();
