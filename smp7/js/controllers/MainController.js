import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'

import SearchModel from '../models/SearchModel.js';


const tag = '[MainController]'

export default {
    init() {
        FormView.setup(document.querySelector('.search-movie'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', () => this.onResetForm())

        TabView.setup(document.querySelector('.content-nav')).on('@change', e => this.onChangeTab(e.detail.tabName))


        ResultView.setup(document.querySelector('.search-result'))

        this.selectedTab = '영화 목록'
        this.renderView()
    },
    renderView() {
        TabView.setSelectTab(this.selectedTab)
        ResultView.hide()
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

}