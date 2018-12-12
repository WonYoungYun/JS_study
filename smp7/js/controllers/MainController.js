import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import ListView from '../views/ListView.js'


import SearchModel from '../models/SearchModel.js';
import ListModel from '../models/ListModel.js'

const tag = '[MainController]'

export default {
    init() {
        FormView.setup(document.querySelector('.search-movie'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', () => this.onResetForm())

        TabView.setup(document.querySelector('.content-nav')).on('@change', e => this.onChangeTab(e.detail.tabName))

        ListView.setup(document.querySelector('.movie-list')).on('@click', e => this.onClickMovieList(e.detail.keyword))

        ResultView.setup(document.querySelector('.search-result'))

        this.selectedTab = '영화 목록'
        this.renderView()
    },

    renderView() {
        TabView.setSelectTab(this.selectedTab)
        if (this.selectedTab === '영화 목록') {
            this.fetchSearchMovieList()
        } else {
            ListView.hide()
        }

        ResultView.hide()
    },

    fetchSearchMovieList() {
        ListModel.list().then(data => {
            ListView.render(data)
        })
    },

    search(query) {
        FormView.setValue(query)
        SearchModel.list(query).then(data => {
            this.onSearchResult(data)
        })
    },
    onSubmit(input) {
        this.search(input)
    },

    onResetForm() {
        this.renderView()
    },
    onSearchResult(data) {
        TabView.hide()
        ResultView.render(data)
    },
    onChangeTab(tabName) {
        this.selectedTab = tabName
        this.renderView()
    },
    onClickMovieList(keyword) {
        this.search(keyword)
    }

}