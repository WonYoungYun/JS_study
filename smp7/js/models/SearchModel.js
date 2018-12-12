const KEY = "9e8b999fb271009b38df5afcdefd5c35";

const MESSAGES = {
    no_info: "정보가 없습니다."
};



export default {
    list(query) {
        const list = this.getMovie(query);
        return list;
    },

    getMovie(query) {
        const refineData = [];
        return fetch(
                `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${KEY}&movieNm=${query}`
            )
            .then(res => {
                return res.json();
            })
            .then(json => {
                const data = json.movieListResult.movieList;
                data.forEach(element => {
                    refineData.push(this.refindingData(element));
                });
                return refineData;
            });
    },
    refindingData(item) {
        const nationAlt = item.nationAlt.length ? item.nationAlt : MESSAGES.no_info;
        const openDt = item.openDt.length ? item.openDt : MESSAGES.no_info;
        const directors = item.directors.length ?
            this.refindingDirectors(item.directors) :
            MESSAGES.no_info;
        return {
            movieNm: item.movieNm,
            movieNmEn: item.movieNmEn,
            genreAlt: item.genreAlt,
            nationAlt,
            openDt,
            directors
        };
    },
    refindingDirectors(directors) {
        const movieDirectors = [];
        directors.forEach(element => {
            movieDirectors.push(element.peopleNm);
        });
        return movieDirectors;
    }
};