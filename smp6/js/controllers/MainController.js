import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'

import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]'


export default {
    init() {
        console.log(tag, 'init()')
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', () => this.onResetForm())
        //chaining을 통해 on함수를 사용하기 위해 FormView의 Setup은 this를 return 해야 한다.
        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.TabName))

        ResultView.setup(document.querySelector('#search-result'))

        this.selectedTab = '추천 검색어'
        this.renderView()


    },

    renderView() {
        console.log(tag, 'renderView()')
        TabView.setActiveTab(this.selectedTab)
        ResultView.hide()
    },

    search(query) {
        //FormView에서 enter를 통해 controller로 이벤트를 전달, 컨트롤러는 @submit이벤트에 연결된 onSubmit실행, onSubmit에서 search를 통해 onSearchResult를 호출하여 ResultView에 Render함
        console.log(tag, 'search()', query)

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
        ResultView.hide()
    },

    onSearchResult(data) {
        ResultView.render(data)
        ResultView.show()
    },

    onChangeTab(tabName) {
        console.log(tag, 'onChageTab()')
    }
}