import View from './View.js'

const tag = '[KeyView]'

const KeywordView = Object.create(View)

KeywordView.setup = function (el) {
    this.init(el)
    return this
}

KeywordView.render = function (data = []) {
    this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : '추천 검색어가 없습니다.'
    this.bindClickEvent()
    this.show()
    return this
}

KeywordView.getKeywordsHtml = function (data) {
    return data.reduce((html, item, index) => {
        html += this.getKeywordsItemHtml(item, index)
        return html
    }, '<ul class="list">') + '</ul>'
}

KeywordView.getKeywordsItemHtml = function (item, index) {
    return `<li data-keyword="${item.keyword}">
    <span class="number">${index + 1}</span>
    ${item.keyword}
</li>`
}

KeywordView.bindClickEvent = function () {
    //li를 Array.from으로 배열로 만든뒤 forEach를 통해 순회함
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => {
            this.onClickKeyword(e)
        })
    })
}

KeywordView.onClickKeyword = function (e) {
    const {
        keyword
    } = e.currentTarget.dataset //.dataset은 읽기는 가능 하지만 쓰기 불가
    this.emit('@click', {
        keyword
    })
}

export default KeywordView