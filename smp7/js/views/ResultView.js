import View from './View.js'

const tag = '[SearchView]'

const ResultView = Object.create(View)

ResultView.setup = function (el) {
    this.init(el)
    return this
}

ResultView.render = function (data = []) {
    console.log(tag, 'render()')
    this.el.innerHTML = data.length ? this.getSearchResultHtml(data) : '검색 결과가 없습니다.'
}

ResultView.getSearchResultHtml = function (data) {
    const html = []
    data.forEach(element => {
        html.push(this.getSearchItemHtml(element))
    });
    return html
}

ResultView.getSearchItemHtml = function (item) {
    return `
    <div class="movie-title">
    <h3 class="movieNm">${item.movieNm}</h3>
    <p class="movieNmEn">영화명 영문</p>
  </div>
  <div class="movie-detail">
    <dl>
      <dt>장르</dt>
      <dd><span class="genreAlt">액션</span></dd>
      <dt>제작</dt>
      <dd><span class="nationAlt">미국</span></dd>
      <dt>개봉</dt>
      <dd><span class="openDt">2015.01.01</span></dd>
      <dt>감독</dt>
      <dd><span class="directors">감독</span></dd>
    </dl>
  </div>
  `
}

export default ResultView