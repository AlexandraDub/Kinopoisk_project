const containerForFilmDescription = document.querySelector('.description__container')
const backgroundContainer = document.querySelector('.main__container__description')
let arrayOfInformation = []
const i = parseInt((window.location.href).match(/\d+/))
backgroundContainer.style.backgroundImage = `url(../Images/ep${i}bg.jpg)`;
console.log(i);
async function descriptionLoad() {
    
    let response = await fetch(`https://swapi.dev/api/films/${i}/`);
    let result = await response.json();
    arrayOfInformation.push(result)
    descriptionRender()
    
}

function descriptionRender() {
    const infoData = arrayOfInformation[0]
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
    const characters = document.createElement('div')
    characters.classList.add('desc_item')
    characters.innerHTML = `<span>Characters${infoData.characters[0]}</span>`
    containerForFilmDescription.append(numberOfEpisode)
    containerForFilmDescription.append(name)
    containerForFilmDescription.append(releaseDate)
    containerForFilmDescription.append(director)
    containerForFilmDescription.append(producer)
    containerForFilmDescription.append(text)
    containerForFilmDescription.append(characters)
}

descriptionLoad()