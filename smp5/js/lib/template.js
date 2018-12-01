module.exports = {
    HTML: (title, list, body, control) => {
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${title}</title>
        </head>
        <body>
        <div id="wrap">
        <h1><a href="/">Logo</a></h1>
        ${body}
        ${list}
        ${control}
        </div>
        </body>
        </html>
      `;
    },
    list: (filelist) => {
        let list = '<ul>';
        filelist.forEach(element => {
            list = list + `<li><a href="/page/${element}">${element}</a></li>`;
        });
        list = list + '</ul>';
        return list;
    }
}