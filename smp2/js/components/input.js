import list from './list.js'

const tag = '[input]'

const inputTodo = document.querySelector('.inputToDo')
const toDoInput = inputTodo.querySelector('input')
const inputBtn = inputTodo.querySelector('button')


function handleSubmit(event){
    event.preventDefault()
    const currentValue = toDoInput.value;
    if(currentValue != "")
        list.paint(currentValue)
    toDoInput.value = ""
}

export default{
    init(){
        list.init()
        inputTodo.addEventListener('submit', handleSubmit)
        inputBtn.addEventListener('click', handleSubmit)

    }
}