const tag = ['']

//검색 히스토리에 대한 데이터를 관장


export default {
    data: [{
            keyword: '검색기록1',
            date: '12.03'
        }, {
            keyword: '검색기록2',
            date: '12.04'
        },
        {
            keyword: '검색기록3',
            date: '12.05'
        }
    ],

    list() {
        return Promise.resolve(this.data)
        //서버에서 비동기로 가져오는경우도있고, 쿠키로 데이터를 얻을수 있기 떄문에 공통적으로 사용하기 위해 비동기 promise로 구현
    },

    add(keyword = '') {
        keyword = keyword.trim()
        if (!keyword) return
        if (this.data.some(item => item.keyword === keyword)) {
            this.remove(keyword)
        }
        //검색기록을 받고 검색기록 리스트와 비교해서 있다면 기존 검색기록 리스트 삭제 후 추가
        const date = '12.31'
        this.date = [{
            keyword,
            date
        }, ...this.data]
    },

    remove(keyword) {
        //키워드를 받아서 키워드에 해당하는 것을 제외한 다른 자료들만 filter로 추려서 새로  data 생성
        this.data = this.data.filter(item => item.keyword !== keyword)
    }

}