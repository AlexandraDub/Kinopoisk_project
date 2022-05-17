let userData = null
let favouriteEpisodes = null

const filmsImagesContainer = document.querySelector('.films')
const filmsCount = 6

const filmDataArr = []
const episodeIdToSwapiIdMap = new Map()

const signInButton = document.querySelector('#login')
const ascSort = document.querySelector('#sort')
//ascSort.addEventListener('change', sortFilms)
const listView = document.querySelector('#list_view')
const tilesView = document.querySelector('#tiles_view')

//listView.addEventListener('click', listViewApply)
//tilesView.addEventListener('click', tilesViewApply)

const loaderWrapper = document.createElement('div')
const loader = document.createElement('div')



//const preferenceFilms = new Set(getPreferenceFilm('sasa'))


async function fetchData() {
    //showLoader()


    // fetch user
    console.log('fetch user')
    const sessionId = localStorage.getItem('my_star_wars_session_id')
    console.log('sessionId', sessionId)

    if (sessionId !== null) {
        let user = await fetchUserData(sessionId)
        console.log('user', user)
        userData = user

        const favouriteEpisodesArr = user ? (user.favouriteEpisodes ? user.favouriteEpisodes : []) : []
        favouriteEpisodes = new Set(favouriteEpisodesArr)
    }

    // fetch films
    for (let i = 1; i <= filmsCount; i++) {
        let response = await fetch(`https://swapi.dev/api/films/${i}/`);
        let result = await response.json();
        console.log('fetch film', result)
        filmDataArr.push(result)
        episodeIdToSwapiIdMap.set(result.episode_id, i)
    }

    sortFilmDataArr()

    filmsRender()
}

function filmsRender() {

    console.log('Films rendering...')

    filmsImagesContainer.innerHTML = ''

    //hideLoader()

    

    for (let i = 1; i <= filmsCount; i++) {

        const filmData = filmDataArr[i - 1]
        const episodeDiv = document.createElement('div')
        const episodeInfoDiv = document.createElement('div')
        const episodeAndInfoContainerDiv = document.createElement('div')
        episodeAndInfoContainerDiv.classList.add('episode_and_info_container')
        episodeDiv.style.backgroundImage = `url(../Images/ep${filmData.episode_id}.png)`;
        episodeDiv.classList.add('episode')

        const favoriteIcon = document.createElement('div')

        favoriteIcon.classList.add('favorites_container')

        if (userData) {
            if (favouriteEpisodes.has(filmData.episode_id)) {
                favoriteIcon.classList.add('is-in-favourite') // rename
            }
        } else {
            favoriteIcon.classList.add('favorites_container_hidden')
        }
        favoriteIcon.innerHTML = `<i class="fa fa-star fa-2x" class="favorites" id=favoriteEpisode${filmData.episode_id}></i>`

        favoriteIcon.addEventListener('click', switchFavourite)

        function switchFavourite() {
            if (favouriteEpisodes.has(filmData.episode_id)) {
                console.log('switch favourite - delete')
                favouriteEpisodes.delete(filmData.episode_id)
                favoriteIcon.classList.remove('is-in-favourite') // rename class

                removeFavouriteEpisode(userData.username, filmData.episode_id)

            } else {
                console.log('switch favourite - add')
                favouriteEpisodes.add(filmData.episode_id)
                favoriteIcon.classList.add('is-in-favourite')

                addFavouriteEpisode(userData.username, filmData.episode_id)

            }
        }
        
        let userPreferences = 'episode_tile'
        episodeDiv.classList.add(userPreferences)

        episodeInfoDiv.classList.add('films_info')

        if (userPreferences === 'episode_list') {
            filmsImagesContainer.classList.add('films_list')
            episodeInfoDiv.classList.add('films_info_list')
            episodeAndInfoContainerDiv.classList.add('episode_and_info_container_list')
        }

        episodeDiv.id = `ep${filmData.episode_id}`
        episodeInfoDiv.innerHTML = `<div> Episode ${filmData.episode_id}</div><div>${filmData.title}</div> <div>Release date:${filmData.release_date}</div>`
        filmsImagesContainer.append(episodeAndInfoContainerDiv)
        episodeAndInfoContainerDiv.append(episodeDiv)
        episodeAndInfoContainerDiv.append(episodeInfoDiv)
        episodeAndInfoContainerDiv.prepend(favoriteIcon)
        // episodeAndInfoContainer.classList.remove('hidden')
        episodeDiv.addEventListener('click', openFilmsDescription)

        function openFilmsDescription(event) {
            event.preventDefault()
            window.location = `film_description.html?swapiId=${episodeIdToSwapiIdMap.get(filmData.episode_id)}&episodeId=${filmData.episode_id}`
        }

    }
}




function listViewApply() {

    // получаем юзера из куки

    // получаем юзердату из локалсторадж по имени юзера
    // let userdata = localstorage.get...

    // userdata.view = 'list' 
    updateViewPreferences('sasa', 'episode_list')

    let episodes = document.querySelectorAll('.episode')
    let informs = document.querySelectorAll('.films_info')
    let epInfContainers = document.querySelectorAll('.episode_and_info_container')
    episodes.forEach(e => e.classList.remove('episode_tile'))
    episodes.forEach(e => e.classList.remove('episode_list'))
    episodes.forEach(e => e.classList.add('episode_list'))
    informs.forEach(e => e.classList.add('films_info_list'))
    filmsImagesContainer.classList.add('films_list')
    epInfContainers.forEach(e => e.classList.add('episode_and_info_container_list'))
}

function tilesViewApply() {

    updateViewPreferences('sasa', 'episode_tile')


    let episodes = document.querySelectorAll('.episode')
    let informs = document.querySelectorAll('.films_info')
    let epInfContainers = document.querySelectorAll('.episode_and_info_container')
    episodes.forEach(e => e.classList.remove('episode_list'))
    episodes.forEach(e => e.classList.remove('episode_tile'))
    episodes.forEach(e => e.classList.add('episode_tile'))
    filmsImagesContainer.classList.remove('films_list')
    informs.forEach(e => e.classList.remove('films_info_list'))
    epInfContainers.forEach(e => e.classList.remove('episode_and_info_container_list'))
}



// Sort comparing functions 
function sortByEpisodeAsc(filmData1, filmData2) {
    return filmData1.episode_id - filmData2.episode_id
}

function sortByEpisodeDesc(filmData1, filmData2) {
    return filmData2.episode_id - filmData1.episode_id
}

function sortByReleaseDateAsc(filmData1, filmData2) {
    return Date.parse(filmData1.release_date) - Date.parse(filmData2.release_date)
}

function sortByReleaseDateDesc(filmData1, filmData2) {
    return Date.parse(filmData2.release_date) - Date.parse(filmData1.release_date)
}

function sortFilmDataArr() {
    console.log('sorting films', userData)
    if (!userData) {
        console.log('Unauthorized users cannot sort films')
        return
    }

    if (userData.sortBy === 'episode_id' && userData.sortType === 'asc') {
        console.log('sorting by episode id asc')
        filmDataArr.sort(sortByEpisodeAsc)
    }

    if (userData.sortBy === 'episode_id' && userData.sortType === 'desc') {
        console.log('sorting by episode desc')

        filmDataArr.sort(sortByEpisodeDesc)
    }

    if (userData.sortBy === 'release_date' && userData.sortType === 'asc') {
        console.log('sorting by release date asc')
        filmDataArr.sort(sortByReleaseDateAsc)
    }

    if (userData.sortBy === 'release_date' && userData.sortType === 'desc') {
        console.log('sorting by release date desc')
        filmDataArr.sort(sortByReleaseDateDesc)
    }
}

// spinner
function showLoader() {
    loaderWrapper.classList.add('loader_wrapper')
    loader.classList.add('lds-roller')
    loader.innerHTML = "<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>"
    filmsImagesContainer.append(loaderWrapper)
    loaderWrapper.append(loader)
    //let epInfContainers = document.querySelectorAll('.episode_and_info_container')
    //epInfContainers.forEach(e => e.classList.add('hidden'))

}

function hideLoader() {
    loaderWrapper.classList.add('hidden')
}

fetchData()



// РЕГИСТРАЦИЯ

    // let userData = {}
    // userdata.password = apple12345
    // userdata.view = 'tile'
    // userdata.ava = 'ava12.jpg'

    // сохраняешь в локалсторадж юзердату против имени   





