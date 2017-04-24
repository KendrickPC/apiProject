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
	
9. Test that knockout.js is working by running through the tutorials. Check to see if data-bind works in the HTML file. 
	http://learn.knockoutjs.com/ 

10. Loaded Google Simple Map from the following link: 
https://developers.google.com/maps/documentation/javascript/examples/map-simple

11. Zhongxiao Xinsheng Station/Coordinates
		25.0420° N, 121.5327° E

12. 


TO DO LIST: 
Restrict zone, data-bind links, make a working search bar, have a working Yelp API installed, Google Maps walking directions installed, 

TO DO LIST: Change YELP API FUSION v3 to Wikipedia API instead. 




