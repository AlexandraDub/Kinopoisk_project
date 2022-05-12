const filmsImagesContainer = document.querySelector('.films')
const filmNumber = 6

let filmDataArr = []

const signInButton = document.querySelector('#login')
const ascSort = document.querySelector('#sort')
ascSort.addEventListener('change', sortFilms)
const listView = document.querySelector('#list_view')
const tilesView = document.querySelector('#tiles_view')

listView.addEventListener('click', listViewApply)
tilesView.addEventListener('click', tilesViewApply)

const loaderWrapper = document.createElement('div')
const loader = document.createElement('div')

const filmMapper = new Map()
    
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

    

function listViewApply() {

    // получаем юзера из куки

    // получаем юзердату из локалсторадж по имени юзера
    // let userdata = localstorage.get...

    // userdata.view = 'list' 

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


async function loadInfo() {
    showLoader()

    for (let i = 1; i <= filmNumber; i++) {
        let response = await fetch(`https://swapi.dev/api/films/${i}/`);
        let result = await response.json();
        console.log('fetch', result)
        filmDataArr.push(result)
        filmMapper.set(result.episode_id, i)
        // loader.classList.add('hidden')
    }
    console.log(filmMapper)
    
    filmsRender()
}

function filmsRender() {

    filmsImagesContainer.innerHTML = ''

    hideLoader()

    for (let i = 1; i <= filmNumber; i++) {

        const filmData = filmDataArr[i - 1]
        const episode = document.createElement('div')
        const info = document.createElement('div')
        const episodeAndInfoContainer = document.createElement('div')
        
        episodeAndInfoContainer.classList.add('episode_and_info_container')
        episode.style.backgroundImage = `url(../Images/ep${filmData.episode_id}.png)`;
        episode.classList.add('episode')

        // получаешь имя пользователя из кук
        // получаешь юзердату из локалсторадж по имени пользователя
        // устанавливаешь класс из юзердаты
        episode.classList.add('episode_tile')

        info.classList.add('films_info')
        episode.id = `ep${filmData.episode_id}`
        info.innerHTML = `<div> Episode ${filmData.episode_id}</div><div>${filmData.title}</div> <div>Release date:${filmData.release_date}</div>`
        filmsImagesContainer.append(episodeAndInfoContainer)
        episodeAndInfoContainer.append(episode)
        episodeAndInfoContainer.append(info)
        
        // episodeAndInfoContainer.classList.remove('hidden')
        episode.addEventListener('click', openFilmsDescription)
        
        function openFilmsDescription(event) {
            event.preventDefault()
            window.location = `film_description.html?swapiId=${filmMapper.get(filmData.episode_id)}&episodeId=${filmData.episode_id}`

        }

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

function sortFilms() {

    if (ascSort.value === 'episode_ascending_sort') {
        filmDataArr.sort(sortByEpisodeAsc)
    }

    if (ascSort.value === 'episode_descending_sort') {
        filmDataArr.sort(sortByEpisodeDesc)
    }

    if (ascSort.value === 'release_ascending_sort') {
        filmDataArr.sort(sortByReleaseDateAsc)
    }

    if (ascSort.value === 'release_descending_sort') {
        filmDataArr.sort(sortByReleaseDateDesc)
    }


    filmsRender()
}



loadInfo()

// РЕГИСТРАЦИЯ

    // let userData = {}
    // userdata.password = apple12345
    // userdata.view = 'tile'
    // userdata.ava = 'ava12.jpg'

    // сохраняешь в локалсторадж юзердату против имени   





