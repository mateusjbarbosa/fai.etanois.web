const express = require('express');

const app = express();

app.use(express.static('./dist/etanois'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: './dist/etanois'});
});

app.listen(process.env.PORT || 8080);