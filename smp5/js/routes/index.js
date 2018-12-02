const express = require('express')
const router = express.Router()
const template = require('../lib/template.js')

router.get("/", (req, res) => {
    let title = "메인 페이지";
    let list = template.list(req.list);
    let html = template.HTML(title, list, ``, `<a href="/page/create">글 쓰기</a>`);
    res.send(html);
});

module.exports = router