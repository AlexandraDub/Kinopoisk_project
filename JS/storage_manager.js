async function createNewUser(username, password, email) {
    const avaNumber = Math.floor(Math.random() * 18)

    let salt = Math.floor(Math.random() * 10000)
    let passwordWithSaltMD5 = CryptoJS.MD5(password + salt).toString();

    const user = {
        'salt': salt,
        'username': username,
        'password': passwordWithSaltMD5,
        'email': email,
        'ava': avaNumber,
        'sortBy': 'release-date',
        'sortType': 'asc',
        'renderType': 'tile',
        'favourites': {
            'episodeList': [],
            'characterList': []
        }
    }

    return fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        }
    })
}

async function checkAvailableUsername(username) {
    return fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => user === null)
}

async function loginAndGetSessionId(username, password) {
    return fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => {
            if (user === null) {
                return null
            }
            if (CryptoJS.MD5(password + user.salt).toString() !== user.password) {
                return null
            }
            let sessionId = `${username}_${Date.now()}`
            return sessionId
        })
}

function generateToken() {

}
