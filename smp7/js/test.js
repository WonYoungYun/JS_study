let movie = []

const KEY = '9e8b999fb271009b38df5afcdefd5c35'

function init() {
    fetch(`	http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${KEY}&targetDt=20180101`)
        .then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
            const list = json.boxOfficeResult.weeklyBoxOfficeList
            Array.from(list).forEach(li => {
                console.log(li.movieNm)
            })
        })
}

init()