console.log('Loaded!');
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
     if (request.readyState === XMLHttpRequest.DONE) {
         if (request.status === 200) {
             var names = request.responseText;
             names = JSON.parse(names);
             var list = '';
             for (var i=0; i< names.length; i++) {
                 list == '<li>' + names[i] + '<li>';
             }
             var uI = document.getElementById('namelist');
             uI.InnerHTML = list ;
         }}};
                 var username = document.getElementById('username').value;
                 var password = document.getElementById('password').value;
                 console.log(username);
                 console.log(password);
var name =nameInput.value;
request.open('POST', 'http://shivaniii.imad.hasura-app.io/login' , true);
request.send(JSON.stringify({username : username, password : password}));
};