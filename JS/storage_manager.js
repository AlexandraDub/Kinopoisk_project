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

function newUser(username, password, email) {
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

    console.log('user', user)

    fetch('https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        }
    })
}

function checkIfUserExist(username) {
    fetch('https://kinopoisk-star-wars-default-rtdb.firebaseio.com/users.json')
        .then(response => response.json())
        .then(users => {
            for (let key in users){
                console.log(users[key])
                if (users[key].username === username){
                    console.log('user found')
                    return true
                }
            }
            console.log('user not found')
            return false
        })
}

function getUser(username) {

}