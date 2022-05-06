const filmsImagesContainer = document.querySelector('.films')
const filmNumber = 6

let filmDataArr = []

const signInButton = document.querySelector('#login')
signInButton.addEventListener('click', () => sortFilms(sortByReleaseDateDesc))

async function loadInfo() {

    for (let i = 1; i <= filmNumber; i++) {
        let response = await fetch(`https://swapi.dev/api/films/${i}/`);
        let result = await response.json();
        console.log(result);
        filmDataArr.push(result)
    }

    filmsRender()
}

function filmsRender() {

filmsImagesContainer.innerHTML = ''

    for (let i = 1; i <= filmNumber; i++) {

        const filmData = filmDataArr[i - 1]
        const episode = document.createElement('div')
        const infoContainer = document.createElement('div')
        episode.style.backgroundImage = `url(../Images/ep${filmData.episode_id}.png)`;
        episode.classList.add('episode')
        infoContainer.classList.add('films_info')
        //episode.id = `ep${i}`
        infoContainer.innerHTML = `<div>Episode ${filmData.episode_id}</div><div>${filmData.title}</div> <div>Release date:${filmData.release_date}</div>`
        filmsImagesContainer.append(episode)
        episode.append(infoContainer)

    }

}

// Sort comparing functions 
function sortByEpisodeAsc(filmData1, filmData2){
    return filmData1.episode_id - filmData2.episode_id
}

function sortByEpisodeDesc(filmData1, filmData2){
    return filmData2.episode_id - filmData1.episode_id
}

function sortByReleaseDateAsc(filmData1, filmData2){
    return Date.parse(filmData1.release_date) - Date.parse(filmData2.release_date)
}

function sortByReleaseDateDesc(filmData1, filmData2){
    return Date.parse(filmData2.release_date) - Date.parse(filmData1.release_date)
}

function sortFilms(comparator) {
    filmDataArr.sort(comparator)
    filmsRender()
}



loadInfo()





