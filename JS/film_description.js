const containerForFilmDescription = document.querySelector('.description__container')
const backgroundContainer = document.querySelector('.main__container__description')
let infoData = {}
const arrayOfCharacters = []

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

const swapiId = params.swapiId
const episodeId = params.episodeId

backgroundContainer.style.backgroundImage = `url(../Images/ep${episodeId}bg.jpg)`;
containerForFilmDescription.id = `episode${episodeId}`
console.log(swapiId);

async function descriptionLoad() {
    
    let response = await fetch(`https://swapi.dev/api/films/${swapiId}/`);
    let result = await response.json();
    console.log(result)
    infoData = result
    descriptionRender()
}


function descriptionRender() {

    const numberOfEpisode = document.createElement('div')
    numberOfEpisode.classList.add('desc_item')
    numberOfEpisode.innerHTML = `<span>Episode${infoData.episode_id}</span>`
    const name = document.createElement('div')
    name.classList.add('desc_item')
    name.innerHTML = `<span>${infoData.title}</span>`
    const releaseDate = document.createElement('div')
    releaseDate.classList.add('desc_item')
    releaseDate.innerHTML = `<span>Date of release:${infoData.release_date}</span>`
    const director = document.createElement('div')
    director.classList.add('desc_item')
    director.innerHTML = `<span>Director:${infoData.director}</span>`
    const producer = document.createElement('div')
    producer.classList.add('desc_item')
    producer.innerHTML = `<span>Producers:${infoData.producer}</span>`
    const text = document.createElement('div')
    text.classList.add('desc_item')
    text.innerHTML = `<span>Opening:${infoData.opening_crawl}</span>`
    
    containerForFilmDescription.append(numberOfEpisode)
    containerForFilmDescription.append(name)
    containerForFilmDescription.append(releaseDate)
    containerForFilmDescription.append(director)
    containerForFilmDescription.append(producer)
    containerForFilmDescription.append(text)

    charactersLoad()
    
}

async function charactersLoad() {
    for(let n = 0; n < 10; n++) {
        let response = await fetch(`${infoData.characters[n]}`);
        let result = await response.json();
        arrayOfCharacters.push(result)
        charactersRender()
    }
    
}
function charactersRender() {
    const characters = document.createElement('div')
    characters.classList.add('character')
    // characters.innerHTML = `<span>Characters${arrayOfCharacters[0]}</span>`
    containerForFilmDescription.append(characters)
    const pictureWrapper = document.createElement('div')
    const picture = document.createElement('img')
    picture.innerHTML = 'url(../Images/reg_avatar/ava16.jpg)'
    const linkWrapper = document.createElement('div')
    const link = document.createElement('a')
    pictureWrapper.append(picture)
    characters.append(pictureWrapper)
}

descriptionLoad()