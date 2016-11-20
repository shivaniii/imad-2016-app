var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'shivaniii',
    database: 'shivaniii',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
secret : 'someRandomSecretValue',
cookie : { maxAge: 1000 * 60 *60 * 24* 30}
}));
           
var articles = {
'article-one' : {
   title : 'Internet | Anumula Shivani',
   heading : 'Internet',
   date : 'Nov 7, 2016',
   content :` <p>The Internet is the global system of interconnected computer networks that use the Internet protocol suite (TCP/IP) to link devices worldwide. It is a network of networks that consists of private, public, academic, business, and government networks of local to global scope, linked by a broad array of electronic, wireless, and optical networking technologies. The Internet carries an extensive range of information resources and services, such as the inter-linked hypertext documents and applications of the World Wide Web (WWW), electronic mail, telephony, and peer-to-peer networks for file sharing.</p>

<p> The origins of the Internet date back to research commissioned by the United States federal government in the 1960s to build robust, fault-tolerant communication via computer networks. The primary precursor network, the ARPANET, initially served as a backbone for interconnection of regional academic and military networks in the 1980s. The funding of the National Science Foundation Network as a new backbone in the 1980s, as well as private funding for other commercial extensions, led to worldwide participation in the development of new networking technologies, and the merger of many networks. The linking of commercial networks and enterprises by the early 1990s marks the beginning of the transition to the modern Internet, and generated a sustained exponential growth as generations of institutional, personal, and mobile computers were connected to the network. Although the Internet was widely used by academia since the 1980s, the commercialization incorporated its services and technologies into virtually every aspect of modern life.</p>
   <p> <img id="internet img" src="http://technophia.org/wp-content/uploads/2016/04/fd3ba9f727da68244fa2dedb48b2ab46.jpg" /> </p>

<p>Internet use grew rapidly in the West from the mid-1990s and from the late 1990s in the developing world. In the 20 years since 1995, Internet use has grown 100-times, measured for the period of one year, to over one third of the world population. Most traditional communications media, including telephony, radio, television, paper mail and newspapers are being reshaped or redefined by the Internet, giving birth to new services such as email, Internet telephony, Internet television music, digital newspapers, and video streaming websites. Newspaper, book, and other print publishing are adapting to website technology, or are reshaped into blogging, web feeds and online news aggregators. The entertainment industry was initially the fastest growing segment on the Internet.[citation needed] The Internet has enabled and accelerated new forms of personal interactions through instant messaging, Internet forums, and social networking. Online shopping has grown exponentially both for major retailers and small businesses and entrepreneurs, as it enables firms to extend their "bricks and mortar" presence to serve a larger market or even sell goods and services entirely online. Business-to-business and financial services on the Internet affect supply chains across entire industries.

<p>The Internet has no centralized governance in either technological implementation or policies for access and usage; each constituent network sets its own policies. Only the overreaching definitions of the two principal name spaces in the Internet, the Internet Protocol address space and the Domain Name System (DNS), are directed by a maintainer organization, the Internet Corporation for Assigned Names and Numbers (ICANN). The technical underpinning and standardization of the core protocols is an activity of the Internet Engineering Task Force (IETF), a non-profit organization of loosely affiliated international participants that anyone may associate with by contributing technical expertise. </p>  `
   
},
'article-two' : {
   title : 'HTML | Anumula Shivani',
   heading : 'HTML',
   date : 'Nov 7, 2016',
   content :`<p> HyperText Markup Language (HTML) is the standard markup language for creating web pages and web applications. With Cascading Style Sheets (CSS), and JavaScript, it forms a triad of cornerstone technologies for the World Wide Web. Web browsers receive HTML documents from a webserver or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.

    <p>HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets. Tags such as image and input introduce content into the page directly. Others such as <p>...</p> surround and provide information about document text and may include other tags as sub-elements. Browsers do not display the HTML tags, but use them to interpret the content of the page.</p>
    <img id="html imge" src="http://fflib.librarymarket.com/sites/default/files/content/events/html-file-extension-interface-symbol_318-45345.png" />

<p>HTML can embed programs written in a scripting language such as JavaScript which affect the behavior and content of web pages. Inclusion of CSS defines the look and layout of content. The World Wide Web Consortium (W3C), maintainer of both the HTML and the CSS standards, has encouraged the use of CSS over explicit presentational HTML since 1997. </p>` 
   },
'article-three' : {
       title : 'Javascript | Anumula Shivani',
   heading : 'Javascript',
   date : 'Nov 7, 2016',
   content :`<p> HyperText Markup Language (HTML) is the standard markup language for creating web pages and web applications. With Cascading Style Sheets (CSS), and JavaScript, it forms a triad of cornerstone technologies for the World Wide Web. Web browsers receive HTML documents from a webserver or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.

    <p>HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets. Tags such as image and input introduce content into the page directly. Others such as <p>...</p> surround and provide information about document text and may include other tags as sub-elements. Browsers do not display the HTML tags, but use them to interpret the content of the page.</p>
    <img id="html imge" src="http://fflib.librarymarket.com/sites/default/files/content/events/html-file-extension-interface-symbol_318-45345.png" />

<p>HTML can embed programs written in a scripting language such as JavaScript which affect the behavior and content of web pages. Inclusion of CSS defines the look and layout of content. The World Wide Web Consortium (W3C), maintainer of both the HTML and the CSS standards, has encouraged the use of CSS over explicit presentational HTML since 1997. </p>'
};
      
function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
var htmlTemplate = `
<html>
<head>
<title>
${title}
</title>
<meta name="viewport" content="width-device-width", initial-scale-1" />
<link href="/ui/style.css" rel="stylesheet" />
</head>
<body>
<div class="container">
<div>
<a href='/'>Home</a>
</div>
<hr/>
<h3>
${heading}
</h3>
<div>
${date.toDateString()}
</div>
<div>
${content}
</div>
</div>
</body>
</html>
`;
return htmlTemplate;
}

function hash (input, salt) {
    // how do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function (req, res){
var hashedString = hash(req.params.input, 'this-is-some-random-string');
res.send(hashedString);
});

app.post('/create-user', function (req, res){
    var username = req.body.username;
    var password = req.body.password;
   pool.query('SELECT * FROM "user" WHERE username = $1,', [username], function(err, result) {
   if (err) {
            res.status(500).send(err.stringify());
        } else {
            if (result.rows.length === 0) {
                res.send(400).send('username/password is invalid!');
            } else {
             var dbString = result.rows[0].password;
             var salt = dbString.split('$')[2];
             var hashedPassword = hash(password, salt); //creating a hash on the password submitted and the original salt
             if (hashedPassword === dbString) {
                 req.session.auth= {userId: result.rows[0].id};
             
            res.send('Credentials correct!');
            } else {
                res.send(403).send('username/password is invalid');
            }
        }}
   }    
); 
});

app.post('/login', function (req, res) {
 
   var username = req.body.username;
 
   var password = req.body.password;
  
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
  
    if (err) {
   
       res.status(500).send(err.toString());
   
   } else {
       
   if (result.rows.length === 0) {
   
           res.status(403).send('username/password is invalid');
    
      } else {
          
              var dbString = result.rows[0].password;
       
       var salt = dbString.split('$')[2];
      
        var hashedPassword = hash(password, salt); 
            if (hashedPassword === dbString) {
     
            req.session.auth = {userId: result.rows[0].id};
      
            res.send('credentials correct!');
   
             
              } else {
             
   res.status(403).send('username/password is invalid');
    
          }
     
     }
     
 }
         

     });

});


app.post('/check-login', function (req, res){
      if (req.session && req.session.auth && req.session.auth.userId) {
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }

});

app.get('/logout', function (req, res) {
    delete req.session.auth;
    res.send('Logged out!');
});

var pool = new Pool(config);

 app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/about-me.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'about-me.html'));
});
app.get('/articles/:articleName', function (req, res) {
    //articleName == article-one
    //articles(articleName) =={} content object for article-one
    //SELECT * FROM article WHERE title = 'article-one'
    var articleName =req.params.articleName;
 pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result){
     if (err) {
         res.status(500).send(err.toString());
     } else {
         if (result.rows.length === 0) {
             res.status(404).send('Article not found');
     } else {
        var articleData= result.rows[0];
        res.send(createTemplate(articleData));
     }
         
     }
 });
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
