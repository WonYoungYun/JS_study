const tag = '[background]'

const backgroundImg = document.getElementById("bgImage")
const IMG_NUMBER = 3;

function paintImage(imgNumber){
    backgroundImg.src = `./img/${imgNumber +1}.jpg`
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER)
    return number
}
export default{
    init(){
        const randomNumber = getRandom()
        paintImage(randomNumber)
    }
}