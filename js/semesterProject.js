// Hold until page load to run the following
$(document).ready(function() {

	// ROTTEN TOMATES
	// For each anchor in an h1, on 'click' run the following
	$('h1 a').bind('click', function(e) {
		// Prevent the anchor from redirecting
		e.preventDefault();

		// Use jQuery's ajax function to make a request to Rotten Tomatoes
		$.ajax({
			method: 'get',
			dataType: 'json',
			// Use the PHP include file to connect to Rotten Tomatoes' API
			url: 'includes/rotten_tomatoes.php',
			// If the request is successful, process the returned data
			success: function(data) {
				// Log the movies array from the returned data object to the browser console
				console.log(data.movies);
				$('#content').html(''); // Reset the content html
				for(x=0; x<data.movies.length; x++) { // Loop through each movie in the array
					// Create a temporary copy of the current movie
					var temp_movie = data.movies[x];
					// Add a new movie element to the content section
					$('#content').append('<div class="movie"></div>');
					// Save a copy of the movie's rating
					var temp_rating = temp_movie.ratings.critics_rating;
					// Setup a class variable and determine whether the movie is "fresh" or "rotten"
					var icon_class = '';
					if(temp_rating == 'Certified Fresh') { icon_class = 'icon_tiny_fresh'; }
					else { icon_class = 'icon_tiny_rotten'; }
					// Add all the appropriate information to the new movie element
					// Note: the element's index is 1 more than that of the loop (JS arrays start at 0 but the DOM reference starts at 1)
					$('#content .movie:nth-child(' + (x+1) + ')').append('<p><span class="' + icon_class + '"></span> <a href="#' + x + '">' + temp_movie.title + '</a> <span>(' + temp_movie.mpaa_rating + ')</span></p>');
					$('#content .movie:nth-child(' + (x+1) + ')').append('<div class="critique">"' + temp_movie.critics_consensus + '"</div>');
					$('#content .movie:nth-child(' + (x+1) + ')').append('<div class="tweets"><p>Loading Tweets...</p>');
					
					// TWITTER
					// For the movie's title anchor, on 'click' run the following
					$('#content .movie:nth-child(' + (x+1) + ') p:first-child a').bind('click', function(e) {
						// Prevent the anchor from redirecting
						e.preventDefault();
						// Get the index of the current movie
						var index = parseInt($(this).attr('href').slice(1)) + 1;
						// Reset the list + "Loading"
						$('#content .movie:nth-child(' + (index) + ') div.tweets').html('<p>Loading Tweets...</p><ul></ul>');

						// Use jQuery's ajax function to make a request to Twitter
						$.ajax({
							method: 'get',
							dataType: 'json',
							// Use the PHP include file to connect to Twitter's API
							// Pass the movie element's index and movie title
							url: 'includes/twitter.php?x=' + index + '&title=' + $(this).text(),
							// If the request is successful, process the returned data
							success: function(data) {
								// Log the returned data object (tweets array) to the browser console
								console.log(data);
								// Add a new <ul> to the respective movie element's "tweets" <div>
								$('#content .movie:nth-child(' + (index) + ') div.tweets').html('<ul></ul>');
								// Cycle through the tweets and add each one as a new <li>
								for(x=0; x<data.results.length; x++) {
									var tweet = '<li><a class="username" href="http://twitter.com/' + data.results[x].from_user + '">' + data.results[x].from_user + '</a>: ' + replaceURLs(data.results[x].text) + '</li>';
									$('#content .movie:nth-child(' + (index) + ') div.tweets ul').append(tweet);
								}
								// Remove the "Loading" text from the "tweets" div
								$('#content .movie:nth-child(' + (index) + ') div.tweets p').remove();
							},
							// If the request is unsuccessful, log an error report
							error: function(data) {
								console.log('Error (Twitter): ' + data);
								$('#content .movie:nth-child(' + (index) + ') div.tweets').html('Error loading Tweets.');
							}
						});
					});
					
					// In order to load all the tweets, trigger them by "clicking" the link to each movie
					$('#content .movie:nth-child(' + (x+1) + ') p:first-child a').trigger('click');
				}
			},
			// If the request is unsuccessful, log an error report
			error: function(data) {
				console.log('Error (Rotten Tomatoes): ' + data);
				$('#content').html('Error loading Rotten Tomatoes data.'); // Reset content element
			}
		});
	});
	// In order to load the movies, we need to first "click" the main anchor(s)
	$('h1 a').trigger('click');
});

// As a bonus, the following function replaces each plain-text URL within the code passed to it
// with a functional anchor element. Add target="_blank" to open links in a new tab.
// Source: http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
function replaceURLs(text) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
	// return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
	// Because the DOCTYPE is XTHML 1.0 Strict, "target" is not a valid attribute. Consider upgrading. :)
	return text.replace(exp,"<a href='$1'>$1</a>"); 
}