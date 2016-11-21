<!doctype html>
<html>
    <head>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
<hr/>
<h3>My Articles</h3>
<a href="/articles/article-one">Internet</a>
<a href="/articles/article-two">HTML</a>
<a href="/articles/article-three">Javascript</a>
        <br>
        <div class="container">
            <div class="center">
            </div>
            <h3>Personal Details</h3>
            <div>
                Hi. My name is Anumula Shivani, studying intermediate second year<br/>
            </div>
        <h3>Aim</h3>
        <div>Aspiring Computer Science Engineer</div>
        <p> <img id="cse img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXw40yGdHYoIrAO8EPxCH3gvpe9d-T0TqDdmqJLx15FOUSKCYL" /> </p>
        <hr/>

        
            <hr/>
            <div id="login_area">
                <center>Loading...Please wait</center>
            </div>
            <hr/>
            <div id="articles">
            </div>
            <div class="footer">
            </div> </div>
        <script type="text/javascript" src="/ui/main.js">
        </script>
    </body>
</html>
