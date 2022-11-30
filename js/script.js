const weatherModule = (() => {
    const displayWeather = document.querySelector('.weather-results');

    const stringCapitalise = (string) => {
        return string
            .toLowerCase()
            .split()
            .map(word => word[0].toUpperCase() + word.substr(1))
    }

    fetch()

    function fetchIcon(code) {
        const image = `https://openweathermap.org/img/w/${code}.png`;
        return image;
    }

    return {
        handleSearch: function (e) {
            e.preventDefault();
            const searchValue = search.value;
            this.handleFetch(searchValue);
            search.value = "";
        },
        handleFetch: async function (searchValue) {
            const dataRequest = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&APPID=dc7f83003ea54969b42fe1a1ce9bb2da`);
            const dataResponse = await dataRequest.json();
            console.log(dataResponse);
            this.renderResults(dataResponse);
        },
        renderResults: (data) => {
            const cityName = data.city.name;
            const countryName = data.city.country;
            const weatherDescr = stringCapitalise(data.list[0].weather[0].description);
            const getIcon = fetchIcon(data.list[0].weather[0].icon);
            const humidity = data.list[0].main.humidity;
            const temperature = Math.round(data.list[0].main.temp);
            const temperature2 = Math.round(data.list[1].main.temp)

            const formattedData = `
                <div class="weather-pill">
                    <div><img src="${getIcon}"><span class="temp">${temperature} / ${temperature2}&#8451;</span></div>
                    <p><span class="weather-location">${cityName}, ${countryName}</span></p>
                    <p><span class="highight">${weatherDescr}</span></p>
                    <p>Humidity: <span class="highight">${humidity}%</span></p>
                </div>
            
            `;
            displayWeather.innerHTML = formattedData;
        }
    }
})();

const search = document.querySelector('.weather-search');
const form = document.querySelector('.search-form')
form.addEventListener('submit', weatherModule.handleSearch.bind(weatherModule));