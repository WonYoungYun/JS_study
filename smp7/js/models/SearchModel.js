const KEY = '9e8b999fb271009b38df5afcdefd5c35'


function getMovie(query) {
    return fetch(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${KEY}&movieNm=${query}`
    ).then(res => {
        return res.json()
    }).then(json => {
        const data = Array.from(json.movieListResult.movieList)
        return data
    })
}


export default {
    list(query) {
        const list = getMovie(query)
        return list
    }
}