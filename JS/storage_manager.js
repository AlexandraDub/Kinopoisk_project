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
        'sortBy': 'release_date',
        'sortType': 'asc',
        'renderType': 'tile',
        'favouriteEpisodes': [],
        'favouriteCharacters': []
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

async function fetchUserData(sessionId) {
    console.log('Getching userdata from Firebase')
    let username = sessionId.split('_')[0]
    console.log('username: ', username)

    return fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())

}

async function addFavouriteEpisode(username, episodeId) {
    fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => {
            if (!user.favouriteEpisodes) {
                user.favouriteEpisodes = []
            }
            user.favouriteEpisodes.push(episodeId)
            return user
        })
        .then(user => updateUser(username, user))
}

async function removeFavouriteEpisode(username, episodeId) {
    fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => {
            const index = user.favouriteEpisodes.indexOf(episodeId);
            if (index > -1) {
                user.favouriteEpisodes.splice(index, 1);
            }
            return user
        })
        .then(user => updateUser(username, user))
}

async function updateUser(username, user) {
    return fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        }
    })
}
