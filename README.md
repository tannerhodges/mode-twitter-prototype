# Rotten Tweetoes

Originally a final project for UCF's Rapid App course, this app is designed to integrate two REST APIs: Rotten Tomatoes and Twitter. The effect is a fun, little social display of current movies. 

Ideas for improvement listed below:

Improvements
============

Load Time Optimization
----------------------
1. Google PageSpeed
	* Fast server response 
		* (M)Improve server response time
	* Minimize payload 
		* (M)Enable compression
		* (L)Minify JavaScript
		* (L)Minify CSS
	* Minimize delay in page load 
		* (L)Specify a character set
	* Other 
		* (L)Leverage browser caching
2. YSlow
	* (F) Add Expires headers
	* (F) Configure entity tags (ETags)
	* (E) Use a Content Delivery Network (CDN)
	* (C) Compress components with gzip
	* (C) Use cookie-free domains

CSS
---
* Convert to SASS
* Normalize
* Fluid design
* Better color scheme

JavaScript
----------
* Convert to CoffeeScript
* Add validation to AJAX requests
* Abstract functions for better readability / maintainability

PHP
---
* Better naming conventions (e.g, twitter.php -> twitter-api-search.php)
* Add validation to includes files
* Use single, stored OAuth connection for Twitter API calls

UI
--
* Show fewer movies
* Show fewer tweets
* Add more relevant data from Rotten Tomatoes (e.g, grade, poster, link, etc)
* Load new tweets (either button or infinite scroll)
* Add movie search
* Add Twitter functions to tweets (e.g, retweet, favorite)
* Link to for nearby theaters (Fandango?)
