const containerForFilmDescription = document.querySelector('.description__container')
const backgroundContainer = document.querySelector('.main__container__description')
let infoData = {}
const arrayOfCharacters = []

let loadedCharacters = 0;

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

    const favoriteIcon = document.createElement('div')
    favoriteIcon.classList.add('favorites_container')
    favoriteIcon.innerHTML = `Add this episode to your favorites <i class="fa fa-star fa-3x" class="favorites" id=favoriteEpisode${episodeId}></i>`

    const pictureEpisode = document.createElement('div')
    pictureEpisode.classList.add('picture_episode')
    pictureEpisode.style.backgroundImage = `url(../Images/ep${episodeId}bg.jpg)`

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
    const charactersTextInfo = document.createElement('div')
    charactersTextInfo.textContent = 'Characters:'
    
    containerForFilmDescription.prepend(favoriteIcon)
    containerForFilmDescription.append(pictureEpisode)
    containerForFilmDescription.append(numberOfEpisode)
    containerForFilmDescription.append(name)
    containerForFilmDescription.append(releaseDate)
    containerForFilmDescription.append(director)
    containerForFilmDescription.append(producer)
    containerForFilmDescription.append(text)
    containerForFilmDescription.append(charactersTextInfo)

    

    charactersLoad()
    
}
const charactersContainer = document.createElement('div')
async function charactersLoad() {
    charactersContainer.classList.add('character')
    // characters.innerHTML = `<span>Characters${arrayOfCharacters[0]}</span>`
    containerForFilmDescription.append(charactersContainer)
    for(let n = loadedCharacters; n < loadedCharacters + 10; n++) {
        if (infoData.characters[n] != null){

            let swapiUrl = infoData.characters[n]
            let swapiArr = swapiUrl.split('/')
            let characterId = swapiArr[swapiArr.length - 2]
            console.log(swapiArr)

            let starWarsUrl = `https://star--wars.herokuapp.com/people/${characterId}`
            let response = await fetch(starWarsUrl);
            let result = await response.json();

            console.log(result)
            //arrayOfCharacters.push(result)
            characterRender(result)
        }
        

        
        
    }

    loadedCharacters += 10
}

function characterRender(result) {
    const pictureAndWikiWrapper = document.createElement('div')
    pictureAndWikiWrapper.classList.add('pic_wiki_wrap')
    const pictureWrapper = document.createElement('div')
    pictureWrapper.style.backgroundImage = `url("${result.image}")`;
    pictureWrapper.classList.add('picture_wrapper')

    const wikiLinkWrapper = document.createElement('div')
    wikiLinkWrapper.innerHTML = `<a href = "${result.wiki}">${result.name}</a>`
    wikiLinkWrapper.classList.add('wiki_link')
   
    charactersContainer.append(pictureAndWikiWrapper)
    pictureAndWikiWrapper.append(pictureWrapper)
    pictureAndWikiWrapper.append(wikiLinkWrapper)

}

descriptionLoad()