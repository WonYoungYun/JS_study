import View from './View.js'


const tag = '[ListView]'

const DATE = new Date()
const date = `${DATE.getFullYear()}-${DATE.getMonth()+1}-${DATE.getDate()}`


const ListView = Object.create(View)

ListView.setup = function (el) {
    this.init(el)
    return this
}

ListView.render = function (data = []) {
    this.el.innerHTML = this.getListHtml(data)
    this.bindClickEvent()
    this.show()
    return this
}

ListView.getListHtml = function (data) {
    return data.reduce((html, item) => {
        html += this.getListItemHtml(item)
        return html
    }, `<h3 class="today">${date}</h3> <ul>`) + '</ul>'
}
ListView.getListItemHtml = function (item) {
    return `
        <li data-keyword="${item.movieNm}">
            <span class="movie-rank">${item.rank} </span>${item.movieNm}<span class="movie-date">${item.openDt}</span>
        </li>
    `
}
ListView.bindClickEvent = function () {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => {
            this.onClickKeyword(e)
        })
    })
}

ListView.onClickKeyword = function (e) {
    const {
        keyword
    } = e.currentTarget.dataset
    this.emit('@click', {
        keyword
    })
}
export default ListView