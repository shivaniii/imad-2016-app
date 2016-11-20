console.log('Loaded!');
var submit = document.getElementById("submit_btn");
submit.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
     if (request.readyState === XMLHttpRequest.DONE) {
         if (request.status === 200) {
           alert('Logged in successfully');
         } else if (request.status === 403) {
             alert('Username/Password is incorrect!');
         } else if (request.status === 500) {
             alert('Something went wrong on the server');
submit.value = 'Login';
         } loadLogin();
     }};

var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST', 'http://shivaniii.imad.hasura-app.io/login' , true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username: username, password: password}));
submit.value = 'Logging in.. Please wait....'};

var register = document.getElementById('register_btn');
register.onclick = function () {
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
if (request.readyState === XMLHttpRequest.DONE) {
if (request.status === 200) {
alert('Registered Successfully!');
register.value = 'User Registered!';
} else {
alert('Couldn't register the user');
register.value = 'Register';
}}};

var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST', '/create-user', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username: username, password: password}));  
register.value = 'Registering User...';
    
    };
}
function loadLoggedInUser (username) {
var loginArea = document.getElementById('login_area');
loginArea.innerHTML =
<h3> Welcome <i>${username}</i></h3>
<a href="/logout">Logout</a>
;
}

function loadLogin () {
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
if (request.readyState === XMLHttpRequest.DONE) {
if (request.status === 200) {
loadLoggedInUser(this.responseText);
} else {
loadLoginForm();
}
}
};
request.open('GET", '/check-login', true);
request.send(null);
}

function loadArticles () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}



loadLogin();

loadArticles();