import ListView from './ListView.js'

const tag = '[ActorView]'

const ActorView = Object.create(ListView)


ActorView.getListHtml = function (data) {
    return data.reduce((html, item) => {
        html += this.getListItemHtml(item)
        return html
    }, '<ul>') + '</ul>'
}

ActorView.getListItemHtml = function (item) {
    return `
        <li data-keyword="${item.peopleNm}">
            ${item.peopleNm} ${item.peopleNmEn}
        </li>
    `
}

export default ActorView