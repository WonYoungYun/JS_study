const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const sanitizeHtml = require('sanitize-html')
const bodyParser = require('body-parser')

const compression = require('compression')
const qs = require('querystring')

const template = require('./js/lib/template.js')

const PORT = 8000

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    fs.readdir('./data', (err, filelist) => {
        if (err) return console.err

        let title = '메인 페이지'
        let list = template.list(filelist)
        let html = template.HTML(title, list, ``,
            `<a href="/create">글 쓰기</a>`
        )
        res.send(html)
    })
})
app.get('/page/:page_id', (req, res, next) => {
    fs.readdir('./data', (err, filelist) => {
        let filteredId = path.parse(req.params.page_id).base
        fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
            if (err) {
                next(err)
            } else {
                let title = req.params.page_id
                let sanitizedTitle = sanitizeHtml(title)
                let sanitizedDescription = sanitizeHtml(description, {
                    aloowedTags: ['h1']
                })
                let list = template.list(filelist)
                let html = template.HTML(sanitizedTitle, list,
                    `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                    ` <a href="/create">create</a>
                      <a href="/update/${sanitizedTitle}">update</a>
                      <form action="/delete" method="post">
                        <input type="hidden" name="id" value="${sanitizedTitle}">
                        <input type="submit" value="delete">
                      </form>`)
                res.send(html)
            }

        })

    })
})

app.get('/create', (req, res) => {
    fs.readdir('./data', (err, filelist) => {
        let title = '글쓰기'
        let list = template.list(filelist)
        let html = template.HTML(title, list, `
        <form action="/create" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
      `, '')
        res.send(html)
    })
})

app.post('/create', (req, res) => {

    let post = req.body
    let title = post.title
    let description = post.description
    fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
        res.writeHead(302, {
            Location: `/?id=${title}`
        })
        res.end()
    })
    // let body = ''
    // req.on('data', (data) => {
    //     body = body + data
    // })
    // req.on('end', () => {
    //     let post = qs.parse(body)
    //     let title = post.title
    //     let description = post.description
    //     fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
    //         res.writeHead(302, {
    //             Location: `/?id=${title}`
    //         })
    //         res.end()
    //     })
    // })
});

app.get('/update/:page_id', (req, res) => {
    fs.readdir('./data', (err, filelist) => {
        let filteredId = path.parse(req.params.page_id).base
        fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
            let title = req.params.page_id
            let list = template.list(filelist)
            let html = template.HTML(title, list,
                `
          <form action="/update" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
                `<a href="/create">create</a> <a href="/update/${title}">update</a>`
            )
            res.send(html)
        })
    })
})

app.post('/update', (req, res) => {
    let post = req.body
    let id = post.id
    let title = post.title
    let description = post.description
    fs.rename(`data/${id}`, `data/${title}`, (error) => {
        fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
            res.writeHead(302, {
                Location: `/?id=${title}`
            })
            res.end()
        })
    })
})

app.post('/delete', (req, res) => {
    let post = req.body
    let id = post.id
    let filteredId = path.parse(id).base
    fs.unlink(`data/${filteredId}`, (err) => {
        res.redirect('/')
    })
})
app.use((req, res, next) => {
    res.status(404).send('Sorry No page')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('error500')
})

app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})



//배열 생성 배열에 제목과 내용 딲딲 넣고 객체형 그리고 파스형태로 해서 파일 저장
//스트링기파이 하기