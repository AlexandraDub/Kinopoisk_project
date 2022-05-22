const filmsCount = 6

const filmDataArr = []
const episodeIdToSwapiIdMap = new Map()

let userData = null
let favouriteEpisodesSet = null

const filmsImagesContainer = document.querySelector('.films')

const filmSortSelect = document.querySelector('#sort')// rename
const listRenderStyleButton = document.querySelector('#list_view')
const tilesRenderStyleButton = document.querySelector('#tiles_view')

filmSortSelect.addEventListener('change', sortFilms)
listRenderStyleButton.addEventListener('click', applyListFilmRenderStyle)
tilesRenderStyleButton.addEventListener('click', applyTilesFilmRenderStyle)

const loaderWrapper = document.createElement('div')
const loader = document.createElement('div')
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

async function fetchData() {
    showLoader()

    // fetch user
    const sessionId = localStorage.getItem('my_star_wars_session_id')
    if (sessionId !== null) {
        let user = await fetchUserData(sessionId)
        userData = user

        const favouriteEpisodesArr = user ? (user.favouriteEpisodes ? user.favouriteEpisodes : []) : []
        favouriteEpisodesSet = new Set(favouriteEpisodesArr)
        showUserMenu()
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

    hideLoader()

    for (let i = 1; i <= filmsCount; i++) {

        const filmData = filmDataArr[i - 1]
        const episodeDiv = document.createElement('div')
        const episodeInfoDiv = document.createElement('div')
        const episodeAndInfoContainerDiv = document.createElement('div')
        episodeAndInfoContainerDiv.classList.add('episode_and_info_container')
        episodeDiv.style.backgroundImage = `url(../Images/ep${filmData.episode_id}.png)`;
        episodeDiv.classList.add('episode')

        // favourite icon
        if (userData) {
            const favouriteIconDiv = document.createElement('div')
            favouriteIconDiv.classList.add('favorites_container')//fix typo

            if (favouriteEpisodesSet.has(filmData.episode_id)) {
                favouriteIconDiv.classList.add('is-in-favourite') // rename
            }

            favouriteIconDiv.innerHTML = `<i class="fa fa-star fa-2x" class="favorites" id=favoriteEpisode${filmData.episode_id}></i>`

            favouriteIconDiv.addEventListener('click', switchFavourite)

            function switchFavourite() {
                if (favouriteEpisodesSet.has(filmData.episode_id)) {
                    console.log('switch favourite - delete')
                    favouriteEpisodesSet.delete(filmData.episode_id)
                    favouriteIconDiv.classList.remove('is-in-favourite') // rename class

                    removeFavouriteEpisodeFromUser(userData.username, filmData.episode_id)
                } else {
                    console.log('switch favourite - add')
                    favouriteEpisodesSet.add(filmData.episode_id)
                    favouriteIconDiv.classList.add('is-in-favourite')

                    addFavouriteEpisodeToUser(userData.username, filmData.episode_id)
                }
            }
            episodeAndInfoContainerDiv.prepend(favouriteIconDiv)
        }

        // tile or list
        let filmRenderStyle = userData.filmRenderStyle
        episodeDiv.classList.add(filmRenderStyle)
        episodeInfoDiv.classList.add('films_info')

        if (filmRenderStyle === 'episode_list') {
            filmsImagesContainer.classList.add('films_list')
            episodeInfoDiv.classList.add('films_info_list')
            episodeAndInfoContainerDiv.classList.add('episode_and_info_container_list')
        }

        episodeDiv.id = `ep${filmData.episode_id}`
        episodeInfoDiv.innerHTML = `<div> Episode ${filmData.episode_id}</div><div>${filmData.title}</div> <div>Release date:${filmData.release_date}</div>`
        filmsImagesContainer.append(episodeAndInfoContainerDiv)
        episodeAndInfoContainerDiv.append(episodeDiv)
        episodeAndInfoContainerDiv.append(episodeInfoDiv)

        // episodeAndInfoContainer.classList.remove('hidden') - check if it is needed
        episodeDiv.addEventListener('click', openFilmsDescription)

        function openFilmsDescription(event) {
            event.preventDefault()
            window.location = `film_description.html?swapiId=${episodeIdToSwapiIdMap.get(filmData.episode_id)}&episodeId=${filmData.episode_id}`
        }
    }
}




function applyListFilmRenderStyle() {
    let episodes = document.querySelectorAll('.episode')
    let informs = document.querySelectorAll('.films_info')
    let epInfContainers = document.querySelectorAll('.episode_and_info_container')

    episodes.forEach(e => e.classList.remove('episode_tile'))
    episodes.forEach(e => e.classList.add('episode_list'))
    informs.forEach(e => e.classList.add('films_info_list'))
    filmsImagesContainer.classList.add('films_list')
    epInfContainers.forEach(e => e.classList.add('episode_and_info_container_list'))

    if (userData) {
        console.log('setting list render type episode_list')
        userData.filmRenderStyle = 'episode_list'
        setFilmRenderStyleToUser(userData.username, 'episode_list')
    }
}

function applyTilesFilmRenderStyle() {
    let episodes = document.querySelectorAll('.episode')
    let informs = document.querySelectorAll('.films_info')
    let epInfContainers = document.querySelectorAll('.episode_and_info_container')

    episodes.forEach(e => e.classList.remove('episode_list'))
    episodes.forEach(e => e.classList.add('episode_tile'))
    filmsImagesContainer.classList.remove('films_list')
    informs.forEach(e => e.classList.remove('films_info_list'))
    epInfContainers.forEach(e => e.classList.remove('episode_and_info_container_list'))

    if (userData) {
        console.log('setting tile render type - episode_tile')

        userData.filmRenderStyle = 'episode_tile'
        setFilmRenderStyleToUser(userData.username, 'episode_tile')
    }
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

function sortFilms() {

    if (filmSortSelect.value === 'episode_ascending_sort') {
        if (userData) {
            userData.sortBy = 'episode_id'
            userData.sortType = 'asc'
            sortFilmDataArr()

            saveSortConfigurationForUser(userData.username, 'episode_id', 'asc')
        }
        else {
            filmDataArr.sort(sortByEpisodeAsc)
        }
    }

    if (filmSortSelect.value === 'episode_descending_sort') {
        if (userData) {
            userData.sortBy = 'episode_id'
            userData.sortType = 'desc'
            sortFilmDataArr()

            saveSortConfigurationForUser(userData.username, 'episode_id', 'desc')
        }
        else {
            filmDataArr.sort(sortByEpisodeDesc)
        }
    }

    if (filmSortSelect.value === 'release_ascending_sort') {
        if (userData) {
            userData.sortBy = 'release_date'
            userData.sortType = 'asc'
            sortFilmDataArr()

            saveSortConfigurationForUser(userData.username, 'release_date', 'asc')
        }
        else {
            filmDataArr.sort(sortByReleaseDateAsc)
        }
    }

    if (filmSortSelect.value === 'release_descending_sort') {
        if (userData) {
            userData.sortBy = 'release_date'
            userData.sortType = 'desc'
            sortFilmDataArr()

            saveSortConfigurationForUser(userData.username, 'release_date', 'desc')
        }
        else {
            filmDataArr.sort(sortByReleaseDateDesc)
        }
    }

    filmsRender()
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


