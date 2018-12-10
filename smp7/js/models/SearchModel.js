const KEY = '9e8b999fb271009b38df5afcdefd5c35'


function getMovie(query) {
    let refineData = []
    return fetch(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${KEY}&movieNm=${query}`
    ).then(res => {
        return res.json()
    }).then(json => {
        const data = json.movieListResult.movieList
        data.forEach(element => {
            refineData.push(refindingData(element))
        });
        return refineData
    })
}

function refindingData(item) {
    return {
        movieNm: item.movieNm,
        movieNmEn: item.movieNmEn,
        genreAlt: item.genreAlt,
        nationAlt: item.nationAlt,
        openDt: item.openDt,
        directors: refindingDirectors(item.directors)
    }
}

function refindingDirectors(directors) {
    const movieDirectors = []
    directors.forEach(element => {
        movieDirectors.push(element.peopleNm)
    })
    return movieDirectors
}

export default {
    list(query) {
        const list = getMovie(query)
        return list
    }
}