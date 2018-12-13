const KEY = "9e8b999fb271009b38df5afcdefd5c35";

export default {
    list() {
        return new Promise(res => {
            setTimeout(() => {
                res(this.getActorList())
            }, 200)
        })
    },

    getActorList() {
        const refinedData = [];
        return fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key=${KEY}`).then(res => {
            return res.json()
        }).then(json => {
            const data = json.peopleListResult.peopleList
            Array.from(data).forEach(element => {
                refinedData.push(this.refindingData(element))
            })
            return refinedData
        })
    },

    refindingData(item) {
        return {
            peopleNm: item.peopleNm,
            peopleNmEn: item.peopleNmEn
        }
    }
}