import View from './View.js'

const tag = '[FormView]'

const FormView = Object.create(View)


//arrow function은 this를 바인딩 하지 않기 때문에 사용 X
FormView.setup = function (el) {
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.showResetBtn(false)
    this.bindEvents()
    return this
}

FormView.showResetBtn = function (show = true) {
    this.resetEl.style.display = show ? 'block' : 'none'
}

FormView.bindEvents = function () {
    this.on('submit', e => e.preventDefault())
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
    this.resetEl.addEventListener('click', () => this.onClickReset())
}

FormView.onKeyup = function (e) {
    const enter = 13
    this.showResetBtn(this.inputEl.value.length)
    if (!this.inputEl.value.length) this.emit('@reset')
    if (e.keyCode !== enter) return
    //@를 통해 커스텀 이벤트 라는것을 표시
    this.emit('@submit', {
        input: this.inputEl.value
    })
}

FormView.onClickReset = function (e) {
    this.emit('@reset')
    this.showResetBtn(false)
}

FormView.setValue = function (value = '') {
    this.inputEl.value = value
    this.showResetBtn(this.inputEl.value)
}

export default FormView