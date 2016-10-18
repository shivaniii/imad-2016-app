var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
 'article-one': {
    title: "Welcome to Anyvasoft | Anumula Shivani",
    heading : "Anyvasoft",
    date : "Oct 18, 2016",
    content : `<p>Welcome to Anyvasoft, India</p>
    <p> Anyvasoft is under construction. <p> `
},
'article-two': {
   title: "",
    heading : "Products | Anyvasoft",
    date : "Oct 18, 2016",
    content : `<p>Products of Anyvasoft will be available here.</p>
    <p>Visit later for more information<p>
    <p>This webpage is under construction`},
    
'article-three': { 
    title: "Feedback | Anyvasoft",
    heading : "",
    date : "Oct 18, 2016",
    content : `<p>Please feel free to share your feedback.</p>`},
};
function createTemplate (data) {

    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
var htmlTemplate =
`<html>
    <head>
        <title>
            ${title} 
        </title>
        <meta name="viewport" content="width-device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
<body>
    <div class ="container">
        <div>
        <a href="/">Home</a>
        </div>
<hr/>
<h3>${heading}
</h3>
<div> ${date} </div>
<div>
     ${content}
</div>
</div>
</body>
</html>` ;
return htmlTemplate;
}
 app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
   counter = counter + 1;
   res.send(counter.toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('ui/my-interests.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'my-interests.html'));
});
app.get('/:articleName', function (req, res) {
 // articleName == article-one
// articles[articleName == {} content object for article-one
var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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
