import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'

const tag = '[MainController]'


export default {
    init() {
        console.log(tag, 'init()')
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', () => this.onResetForm())
        //chaining을 통해 on함수를 사용하기 위해 FormView의 Setup은 this를 return 해야 한다.
        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName))

        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword))

        HistoryView.setup(document.querySelector('#search-history'))
            .on('@click', e => this.onClickHistory(e.detail.keyword))
            .on('@remove', e => this.onRemoveHistory(e.detail.keyword))
        ResultView.setup(document.querySelector('#search-result'))

        this.selectedTab = '추천 검색어'
        this.renderView()


    },

    renderView() {
        console.log(tag, 'renderView()')
        TabView.setActiveTab(this.selectedTab)


        if (this.selectedTab === '추천 검색어') {
            this.fetchSearchKeyword()
            HistoryView.hide()
        } else {
            this.fetchSearchHistory()
            KeywordView.hide()
        }

        ResultView.hide()
    },
    fetchSearchKeyword() {
        KeywordModel.list().then(data => {
            KeywordView.render(data)
        })
    },

    fetchSearchHistory() {
        HistoryModel.list().then(data => {
            HistoryView.render(data).bindRemoveBtn()
            //왜 여기서 호출? render함수가 호출되면 DOM이 생성되고 그 뒤 이벤트를 bind 할 수 있기때문에 여기서 bind
        })
    },

    search(query) {
        FormView.setValue(query)
        HistoryModel.add(query)
        //FormView에서 enter를 통해 controller로 이벤트를 전달, 컨트롤러는 @submit이벤트에 연결된 onSubmit실행, onSubmit에서 search를 통해 onSearchResult를 호출하여 ResultView에 Render함

        //SearchModel의 list가 Promise기 때문에 then을 통해 onSearchResult가능
        SearchModel.list(query).then(data => {
            this.onSearchResult(data)
        })

    },
    onSubmit(input) {
        console.log(tag, 'OnSubmit')
        this.search(input)
    },

    onResetForm() {
        console.log(tag, 'OnResetForm')
        this.renderView()
    },

    onSearchResult(data) {
        TabView.hide()
        KeywordView.hide()
        HistoryView.hide()
        ResultView.render(data)
    },

    onChangeTab(tabName) {
        console.log(tabName)
        this.selectedTab = tabName
        this.renderView()
    },

    onClickKeyword(keyword) {
        this.search(keyword)
    },

    onClickHistory(history) {
        this.search(history)
    },

    onRemoveHistory(history) {
        HistoryModel.remove(history)
        this.renderView()
    }
}