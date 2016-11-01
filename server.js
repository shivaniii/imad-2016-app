var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'shivaniii',
    database: 'shivaniii',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
           
 app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articles/:articleName', function (req, res) {
    //articleName == article-one
    //articles(articleName) =={} content object for article-one
    //SELECT * FROM article WHERE title = 'article-one'
 pool.query("SELECT * FROM article WHERE title = " + req.params.articleName + "'", function (err, result){
     if (err) {
         res.status(500).send(err.toString());
     } else {
         if (result.rows.length === 0) {
             res.status(404).send('Article not found');
     } else {
        var articleData= result.rows[0];
        res.sendFile(createTemplate(articleData));
     }}
 });
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    // make a select request
    // return a response with the results
    pool.query('SELECT * FROM test', function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
        }
);
});

app.get('/my-interests.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'my-interests.html'));
});

app.get('/about-me.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'about-me.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
