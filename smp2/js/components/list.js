const tag = '[list]'

const toDoList = document.querySelector('.todoList')
const TODOS_LS = 'toDos'

let toDos = []

function deleteToDo(){
    
    const btn = event.target
    const li = btn.parentNode.parentNode
    console.log(li)
    toDoList.removeChild(li)
    const cleanToDos = toDos.filter(toDo=>{
        return toDo.id !== parseInt(li.id)
    })
    toDos = cleanToDos
    saveToDos()
}

function paintTodo(text){
    const li = document.createElement('li')
    const span = document.createElement('span')
    const delBtn = document.createElement('span')
    const eraser = document.createElement('i')
    eraser.classList.add('fas')
    eraser.classList.add('fa-eraser')

    // const eraser = '<i class="fas fa-eraser"></i>'
    const newId = toDos.length +1;
    delBtn.classList.add('delBtn')
    span.innerText = text
    delBtn.appendChild(eraser)
    li.appendChild(span)
    li.appendChild(delBtn)
    eraser.addEventListener("click", deleteToDo)
    li.id = newId;

    toDoList.appendChild(li)
    const toDoObj = {
        done: false,
        text,
        id: newId
    }
    toDos.push(toDoObj)
    saveToDos()
}
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS)
    if(loadedToDos !== null){
        const parseToDos = JSON.parse(loadedToDos)
        parseToDos.forEach(toDo =>{
            paintTodo(toDo.text)
        })
    }
}
export default  {
    paint(text){
        paintTodo(text)
    },
    init(){
        loadToDos()
    }
}