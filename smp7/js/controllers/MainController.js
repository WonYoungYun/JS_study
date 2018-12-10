import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'

import SearchModel from '../models/SearchModel.js';


const tag = '[MainController]'

export default {
    init() {
        FormView.setup(document.querySelector('.search-movie'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', () => this.onResetForm())
        ResultView.setup(document.querySelector('.search-result'))
    },
    renderView() {
        console.log('renderView()')
    },
    search(query) {
        FormView.setValue(query)
        SearchModel.list(query).then(data => {
            this.onSearchResult(data)
        })
    },
    onSubmit(input) {
        console.log(tag, 'OnSubmit', input)
        this.search(input)
    },

    onResetForm() {
        console.log(tag, 'OnResetForm')
        this.renderView()
    },
    onSearchResult(data) {
        ResultView.render(data)
    }

}