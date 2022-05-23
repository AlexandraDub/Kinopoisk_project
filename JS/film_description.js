const containerForFilmDescription = document.querySelector('.description__container')
const backgroundContainer = document.querySelector('.main__container__description')
let userData = {}
let infoData = {}
let username = ''
const arrayOfCharacters = []
const favouriteEpisodeSet = new Set()

let loadedCharacters = 0;
let favouriteCharactersSet = new Set()

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

const swapiId = params.swapiId
const episodeId = params.episodeId

backgroundContainer.style.backgroundImage = `url(../Images/ep${episodeId}bg.jpg)`;
containerForFilmDescription.id = `episode${episodeId}`

async function descriptionLoad() {
    // redirect
    const sessionId = localStorage.getItem('my_star_wars_session_id')
    if (!sessionId){
        window.location.href = 'registration.html'
    }
    checkSessionExpiredAndLogOut(sessionId)
    
    username = sessionId.split('_')[0]

    // fetch film data
    let response = await fetch(`https://swapi.py4e.com/api/films/${swapiId}/`);
    let result = await response.json();
    infoData = result

    //fetch user
    const user = await fetchUserData(sessionId)
    userData = user
    if (user.favouriteEpisodes){
        user.favouriteEpisodes.forEach(e=> favouriteEpisodeSet.add(e))    
    }
    if (user.favouriteCharacters){
        user.favouriteCharacters.forEach(c=> favouriteCharactersSet.add(c))
    }
    showUserMenu()
    descriptionRender()
}


function descriptionRender() {

    const favouriteIconContainer = document.createElement('div')
    containerForFilmDescription.prepend(favouriteIconContainer)
    favouriteIconContainer.classList.add('favorites_container')
    favouriteIconContainer.innerHTML = `Add this episode to your favorites <i class="fa fa-star fa-3x" class="favorites" id=favoriteEpisode${episodeId}></i>`
    favouriteIconContainer.addEventListener('click',changePreferenceFilm)
    if (favouriteEpisodeSet.has(infoData.episode_id)){
        favouriteIconContainer.classList.add('is-in-favourite')
        favouriteIconContainer.innerHTML = `Remove this episode to your favorites <i class="fa fa-star fa-3x" class="favorites" id=favoriteEpisode${episodeId}></i>`
    }
        function changePreferenceFilm() {
            if (favouriteEpisodeSet.has(infoData.episode_id)){
                favouriteEpisodeSet.delete(infoData.episode_id)
                favouriteIconContainer.classList.remove('is-in-favourite')
                favouriteIconContainer.innerHTML = `Add this episode to your favorites <i class="fa fa-star fa-3x" class="favorites" id=favoriteEpisode${episodeId}></i>`
                
                removeFavouriteEpisodeFromUser(username, infoData.episode_id)
            } else {
                favouriteEpisodeSet.add(infoData.episode_id)
                favouriteIconContainer.classList.add('is-in-favourite')
                favouriteIconContainer.innerHTML = `Remove this episode to your favorites <i class="fa fa-star fa-3x" class="favorites" id=favoriteEpisode${episodeId}></i>`

                addFavouriteEpisodeToUser(username, infoData.episode_id)
            }
        }

    const pictureEpisode = document.createElement('div')
    pictureEpisode.classList.add('picture_episode')
    pictureEpisode.style.backgroundImage = `url(../Images/ep${episodeId}bg.jpg)`

    const numberOfEpisode = document.createElement('div')
    numberOfEpisode.classList.add('desc_item')
    numberOfEpisode.innerHTML = `<span>Episode&nbsp;${infoData.episode_id}</span>`
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
    charactersTextInfo.classList.add('characters_info')
    charactersTextInfo.textContent = 'Characters:'
    
    
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
const buttonLoadMore = document.querySelector('.load_more')
async function charactersLoad() {
    charactersContainer.classList.add('character')
    containerForFilmDescription.append(charactersContainer)
    for(let n = loadedCharacters; n < loadedCharacters + 5; n++) {
        if (infoData.characters[n] != null){

            let swapiUrl = infoData.characters[n]
            let swapiArr = swapiUrl.split('/')
            let characterId = swapiArr[swapiArr.length - 2]
            console.log(swapiArr)

            let starWarsUrl = `https://star--wars.herokuapp.com/people/${characterId} `
            let response = await fetch(starWarsUrl);
            let result = await response.json();

            console.log('character', result)
            //arrayOfCharacters.push(result)
            characterRender(result)
        }
    }

    loadedCharacters += 5
}
buttonLoadMore.addEventListener('click', charactersLoad)

function characterRender(result) {
    const pictureAndWikiWrapper = document.createElement('div')
    pictureAndWikiWrapper.classList.add('pic_wiki_wrap')
    const pictureWrapper = document.createElement('div')
    pictureWrapper.style.backgroundImage = `url("${result.image}")`;
    pictureWrapper.classList.add('picture_wrapper')

    const wikiLinkWrapper = document.createElement('div')
    wikiLinkWrapper.innerHTML = `<a href = "${result.wiki}">${result.name}</a>`
    wikiLinkWrapper.classList.add('wiki_link')

    const favouriteIconDiv = document.createElement('div')
    favouriteIconDiv.innerHTML = `<i class="fa fa-star" id=favouriteCharacter:${result.name}></i>`
    if (favouriteCharactersSet.has(result.id)){
        favouriteIconDiv.classList.add('is-in-favourite')
    }
    wikiLinkWrapper.append(favouriteIconDiv)
   
    charactersContainer.append(pictureAndWikiWrapper)
    pictureAndWikiWrapper.append(pictureWrapper)
    pictureAndWikiWrapper.append(wikiLinkWrapper)

    favouriteIconDiv.addEventListener('click', switchFavouriteCharacter)

    function switchFavouriteCharacter() {
         if (favouriteCharactersSet.has(result.id)) {
             console.log('switch favourite - delete')
             favouriteCharactersSet.delete(result.id)
             favouriteIconDiv.classList.remove('is-in-favourite') // rename class

             removeFavouriteCharacterFromUser(userData.username, result.id)
         } else {
             console.log('switch favourite - add')
             favouriteCharactersSet.add(result.id)
             favouriteIconDiv.classList.add('is-in-favourite')

             addFavouriteCharacterToUser(userData.username, result.id)
         }
     }

}

descriptionLoad()

