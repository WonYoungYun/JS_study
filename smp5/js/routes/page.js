const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const sanitizeHtml = require('sanitize-html')
const template = require('../lib/template.js')





router.get("/create", (req, res) => {
  fs.readdir('data', (err, filelist) => {
    let title = "글쓰기";
    let list = template.list(filelist);
    let html = template.HTML(
      title,
      list,
      `
          <form action="/page/create" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `,
      ""
    );
    res.send(html);
  });
});

router.post("/create", (req, res) => {
  let post = req.body;
  let title = post.title;
  let description = post.description;
  fs.writeFile(`data/${title}`, description, "utf8", err => {
    res.redirect(`/page/${title}`);
  });
});

router.get("/update/:page_id", (req, res) => {
  fs.readdir("data", (err, filelist) => {
    let filteredId = path.parse(req.params.page_id).base;
    fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
      let title = req.params.page_id;
      let list = template.list(filelist);
      let html = template.HTML(
        title,
        list,
        `
            <form action="/page/update" method="post">
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
        `<a href="/page/create">create</a> <a href="/page/update/${title}">update</a>`
      );
      res.send(html);
    });
  });
});

router.post("/update", (req, res) => {
  let post = req.body;
  let id = post.id;
  let title = post.title;
  let description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, error => {
    fs.writeFile(`data/${title}`, description, "utf8", err => {
      res.writeHead(302, {
        Location: `/?id=${title}`
      });
      res.end();
    });
  });
});

router.post("/delete", (req, res) => {
  let post = req.body;
  let id = post.id;
  let filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, err => {
    res.redirect("/");
  });
});

router.get("/:page_id", (req, res, next) => {
  fs.readdir("data", (err, filelist) => {
    let filteredId = path.parse(req.params.page_id).base;
    fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
      if (err) {
        next(err);
      } else {
        let title = req.params.page_id;
        let sanitizedTitle = sanitizeHtml(title);
        let sanitizedDescription = sanitizeHtml(description, {
          aloowedTags: ["h1"]
        });
        let list = template.list(filelist);
        let html = template.HTML(
          sanitizedTitle,
          list,
          `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
          ` <a href="/page/create">create</a>
            <a href="/page/update/${sanitizedTitle}">update</a>
            <form action="/page/delete" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`
        );
        res.send(html);
      }
    });
  });
});

module.exports = router