const tag = '[View]'

export default {
    init(el) {
        if (!el) throw el
        this.el = el
        return this
    },

    on(event, handler) {
        this.el.addEventListener(event, handler)
        return this
    },

    emit(event, data) {
        const evt = new CustomEvent(event, {
            detail: data
        })
        //커스텀 이벤트로 이벤트를 만들고 디스패치이벤트로 이벤트를 날림
        this.el.dispatchEvent(evt)
        return this
    },

    hide() {
        this.el.style.display = 'none'
        return this
    },

    show() {
        this.el.style.display = ''
        console.log(tag, 'show()', this)
        return this
    }
}