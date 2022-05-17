function createStorage() {
    fetch('https://kinopoisk-star-wars-default-rtdb.firebaseio.com/storage.json', {
        method: 'POST',
        body: JSON.stringify('{}'),
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//

async function createNewUser(username, password, email) {
    const avaNumber = Math.floor(Math.random() * 18)

    const user = {
        'username': username,
        'password': password,
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
