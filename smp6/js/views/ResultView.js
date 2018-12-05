import View from './View.js'

const tag = '[ResultView]'

const ResultView = Object.create(View)

ResultView.setup = function (el) {
    this.init(el)
}


//data = [] 는 데이터를 컬렉션으로 받는다는 뜻
ResultView.render = function (data = []) {
    console.log(tag, 'render()', data)
    this.el.innerHTML = data.length ? this.getSearchResulHtml(data) : '검색 결과가 없습니다'
}

ResultView.getSearchResulHtml = function (data) {
    return data.reduce((html, item) => {
        html += this.getSearchItemHtml(item)
        return html
    }, '<ul>') + '</ul>'
    //ul + li + li ... li + ul
}

ResultView.getSearchItemHtml = function (item) {
    return `<li>
        <img src="${item.image}">
        <p>${item.name}</p>
    </li>`
}


export default ResultView