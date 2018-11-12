const weather = document.querySelector('.js-weather')

const API_KEY = "bcf99d3242b1baf36e3eb2ace8ea3dfb"
const COORDS = 'coords'

function getWeather(lat,lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(response =>{
            return response.json()
        }).then(json =>{
            const temperature = json.main.temp
            const place = json.name
            weather.innerText = `${temperature}℃ ${place}`
        })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucess(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj)
    getWeather(latitude,longitude)
}
function hanldeGeoError(){
    console.log('Cant access geo location')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucess, hanldeGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS)
    if(loadedCoords === null){
        askForCoords()
    } else{
        const parseCoords = JSON.parse(loadedCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}



function init(){
    loadCoords()
}
init()