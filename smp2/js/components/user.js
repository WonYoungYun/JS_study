const tag = '[user]'

const modal = document.querySelector(".modal")
const form = modal.querySelector(".inputName")
const input = form.querySelector("input")
const modalBg = document.querySelector(".modal-bg")
const userName = document.querySelector(".userName")
const button = modal.querySelector('button')

const USER_NAME = "currentUser"
const SHOW_CHANGE = "showing"

function saveName(value){
    localStorage.setItem(USER_NAME, value)
}
function paintGreeting(value){
    userName.style.opacity = "1"
    userName.innerText = `Welcome! ${value}`
}
function handleSubmit(e){
    modal.classList.remove(SHOW_CHANGE)
    modalBg.classList.remove(SHOW_CHANGE)
    e.preventDefault()
    const value = input.value
    paintGreeting(value)
    saveName(value)
}
function askUserName(){
    modal.classList.add(SHOW_CHANGE)
    modalBg.classList.add(SHOW_CHANGE)
    form.addEventListener("submit", handleSubmit)
    button.addEventListener("click", handleSubmit)

}

function loadName(){
    const currentUser = localStorage.getItem(USER_NAME)
    if(currentUser === null){

        askUserName()
    } else{
        paintGreeting(currentUser)
    }
}

export default{
    init(){
        loadName()
    }
}