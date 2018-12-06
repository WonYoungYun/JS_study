import KeywordView from './KeywordView.js'

const tag = '[HistoryView]'

const HistoryView = Object.create(KeywordView)

// HistoryView.messages.NO_KEYTWORDS = '검색 이력이 없습니다'

//KeywordView의 getKeywordsHtml을 오버라이딩
HistoryView.getKeywordsHtml = function (data) {
    return data.reduce((html, item) => {
        html += this.getKeywordsItemHtml(item)
        return html
    }, '<ul class="list">') + '</ul>'
}


HistoryView.getKeywordsItemHtml = function (item) {
    return `<li data-keyword="${item.keyword}">
    ${item.keyword}
    <span class="date">${item.date}</span>
    <button class="btn-remove"></button>
    </li>
    `
}

//MainController에서 bind됨
HistoryView.bindRemoveBtn = function () {
    Array.from(this.el.querySelectorAll('button.btn-remove')).forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation()
            this.onRemove(btn.parentElement.dataset.keyword)
        })
    })
}

HistoryView.onRemove = function (keyword) {
    this.emit('@remove', {
        keyword
    })
}
export default HistoryView