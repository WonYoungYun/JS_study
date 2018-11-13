import user from './components/user.js'
import clock from './components/clock.js'
import weather from './components/weather.js'
import background from './components/bg.js'
import input from './components/input.js'

document.addEventListener("DOMContentLoaded", ()=>{
    user.init()
    clock.init()
    weather.init()
    input.init()
    background.init()
    
})