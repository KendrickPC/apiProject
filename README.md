README.md

1. Create index.html file and upload it to github

2. Install Bower as a package manager
	https://bower.io/
		TERMINAL
			cd apiProject
				npm install -g bower

3. favicon.ico added to apiProject folder. 

4. Install jQuery via bower
	TERMINAL
		cd apiProject
			bower install jquery
				added jquery.min.js in HTML file 
					<script src="bower_components/jquery/dist/jquery.min.js"></script>


5. Install Knockout.js
	http://knockoutjs.com/downloads/index.html
		TERMINAL
			cd apiProject
				bower install knockout
					added knockout.js in HTML file
						<script type='text/javascript' src='bower_components/knockout/dist/knockout.js'></script>

6. Install Bootstrap CSS and JS files
	http://getbootstrap.com/getting-started/
		TERMINAL
			cd apiProject
				bower install bootstrap
					added bootstrap.css in HTML file
						<link href="bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
					added bootstrap.js in HTML file
						<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

7. Add a custom css file for project
	<link href="css/styles.css" rel="stylesheet">

8. Add a custom js file for project (place it immediately above the closing body tag)
	<script src="js/main.js"></script>
	
9. Go through the knockout.js tutorial
	http://learn.knockoutjs.com/ 






