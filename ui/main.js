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
         } loadLogin();
     }};

var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST', 'http://shivaniii.imad.hasura-app.io/login' , true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username: username, password: password}));

var submit = document.getElementById('submit_btn2');
submit.onclick = function () {
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
if (request.readyState === XMLHttpRequest.DONE) {
if (request.status === 200) {
alert('Registered Successfully!');
register.value = 'User Registered!';
} else {
alert('Could not register the user');
submit.value = 'Submit';
}}};

var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST', '/create-user', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username: username, password: password}));  
submit.value = 'Registering User...';
    
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


loadLogin();
