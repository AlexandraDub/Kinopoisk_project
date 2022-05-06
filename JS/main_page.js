const filmsImagesContainer = document.querySelector('.films')

async function loadInfo() {
    for (let i = 1; i <= 6; i++) {
        let response = await fetch(`https://swapi.dev/api/films/${i}/`);
        let result = await response.json();
        console.log(result);
        filmsRender(result)
        function filmsRender(result) {

            const episode = document.createElement('div')
            const infoContainer = document.createElement('div')
            episode.style.backgroundImage = `url(../Images/ep${i}.png)`;
            episode.classList.add('episode')
            infoContainer.classList.add('films_info')
            episode.id = `ep${i}`
            infoContainer.innerHTML = `${result.title}, ${result.episode_id}, ${result.release_date}`
            filmsImagesContainer.append(episode)
            episode.append(infoContainer)
        
        
        
        }
    }


}
loadInfo()



