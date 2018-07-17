const URL = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"

let cities = [];

fetch(URL)
.then(blob => blob.json()
.then(data => cities = data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {

        let regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
        

    })
}

function showMatches() {
    if (this.value === "") {
        suggestions.innerHTML = `<li>Filter for a city</li>
        <li>or a state</li>`;
    } else {

        let matchesArray = findMatches(this.value, cities);
        let html = matchesArray.map(item => {

            let regex = new RegExp(this.value, 'gi');
            let cityName = item.city.replace(regex, `<span class=hl>${this.value}</span>`)
            let stateName = item.state.replace(regex, `<span class=hl>${this.value}</span>`)
            return `<li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${item.population}</span>
            </li>`
        }).join('');

        suggestions.innerHTML = html;

    }

}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', showMatches);
searchInput.addEventListener('keyup', showMatches);