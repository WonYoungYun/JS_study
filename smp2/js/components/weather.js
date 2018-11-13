const tag = '[weather]'

const docWeather = document.querySelector('.weather')

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
            docWeather.innerText = `${temperature}℃ ${place}`
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
function handleGeoError(){
    console.error('Cant Access Geo Location')
}
function askCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError)
}

function getCoords(){
    const loadedCoords = localStorage.getItem(COORDS)
    if(loadedCoords === null){
        askCoords()
    }else {
        const parseCoords = JSON.parse(loadedCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}
export default{

   init(){
      getCoords()
   }
}