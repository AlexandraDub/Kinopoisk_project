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
        'filmRenderStyle': 'episode_tile',
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

async function addFavouriteEpisodeToUser(username, episodeId) {
    fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => {
            if (!user.favouriteEpisodes) {
                user.favouriteEpisodes = []
            }
            user.favouriteEpisodes.push(episodeId)
            return user
        })
        .then(updateUser)
}

async function addFavouriteCharacterToUser(username, characterId) {
    fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => {
            if (!user.favouriteCharacters) {
                user.favouriteCharacters = []
            }
            user.favouriteCharacters.push(characterId)
            return user
        })
        .then(updateUser)
}

async function removeFavouriteEpisodeFromUser(username, episodeId) {
    fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => {
            const index = user.favouriteEpisodes.indexOf(episodeId);
            if (index > -1) {
                user.favouriteEpisodes.splice(index, 1);
            }
            return user
        })
        .then(updateUser)
}

async function removeFavouriteCharacterFromUser(username, characterId) {
    fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => {
            const index = user.favouriteCharacters.indexOf(characterId);
            if (index > -1) {
                user.favouriteCharacters.splice(index, 1);
            }
            return user
        })
        .then(updateUser)
}

async function setFilmRenderStyleToUser(username, style){
    fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => {
            user.filmRenderStyle = style
            return user
        })
        .then(updateUser)
}

async function saveSortConfigurationForUser(username, sortBy, sortType){
    fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${username}.json`)
        .then(response => response.json())
        .then(user => {
            user.sortBy = sortBy
            user.sortType = sortType
            return user
        })
        .then(updateUser)
}

async function updateUser(user) {
    return fetch(`https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users/${user.username}.json`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        }
    })
}
