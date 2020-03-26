const express = require('express');
const app = express();

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const firstBlock = `
<!doctype html>
<head>
    <title>My Page</title>
    <link rel="preload" href="https://unpkg.com/react@16.13.1/umd/react.production.min.js" as="script" crossorigin="anonymous">
    <link rel="preload" href="https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" as="script" crossorigin="anonymous">
`;
const secondBlock = `
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js" as="script" crossorigin="anonymous">
</head>
    <div style="height: 600px;width: 600px;background-color: azure;">First chunk</div>
`
const finalBlock = `<div>Second chunk</div><a href=''>Reload</a>`;

app.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    res.write(firstBlock);

    await (delay(800))

    res.write(secondBlock);

    await (delay(500))

    res.write('<h1>ss</h1>');

    setTimeout(() => {
        res.end(finalBlock);
    }, 500);
    // res.end(firstBlock + secondBlock + finalBlock);
});

app.listen(8080);