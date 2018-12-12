import View from './View.js'

const tag = '[TabView]'


const TabView = Object.create(View)


TabView.setup = function (el) {
    this.init(el);
    this.bindClick(el)
    return this;
}

TabView.bindClick = function () {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', () => {
            this.onClick(li.innerHTML)
        })
    })
}

TabView.onClick = function (tabName) {
    this.setSelectTab(tabName)
    this.emit('@change', {
        tabName
    })
}

TabView.setSelectTab = function (tabName) {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ? 'selected' : ''
    })
    this.show()
}

export default TabView