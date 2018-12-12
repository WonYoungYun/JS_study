const KEY = "9e8b999fb271009b38df5afcdefd5c35";


export default {
    list() {
        return new Promise(res => {
            setTimeout(() => {
                res(this.getMovieList())
            }, 200)
        })
    },

    getMovieList() {
        const date = this.getTodayDate();
        const refinedData = [];
        return fetch(
            `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KEY}&targetDt=${date}`
        ).then(res => {
            return res.json()
        }).then(json => {
            const data = json.boxOfficeResult.dailyBoxOfficeList;
            Array.from(data).forEach(element => {
                refinedData.push(this.refindingData(element))
            })
            return refinedData
        })
    },
    getTodayDate() {
        const DATE = new Date()
        const year = DATE.getFullYear()
        const month = DATE.getMonth() + 1
        const day = DATE.getDate() - 1
        return '' + year + month + day
    },
    refindingData(item) {
        return {
            rank: item.rank,
            movieNm: item.movieNm,
            openDt: item.openDt
        }
    }
}