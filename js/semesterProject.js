$(document).ready(function() {
	$('h1 a').bind('click', function(e) {
		e.preventDefault();
		$.ajax({
			method: 'get',
			dataType: 'json',
			url: 'includes/rotten_tomatoes.php',
			success: function(data) {
				console.log(data.movies);
				$('#content').html(''); // Reset content element
				for(x=0; x<data.movies.length; x++) { // Add each movie
					var temp = data.movies[x];
					// Create movie element
					$('#content').append('<div class="movie"></div>');
					// Title & Rating
					var temp_rating = temp.ratings.critics_rating;
					var icon_class = '';
					if(temp_rating == 'Certified Fresh') { icon_class = 'icon_tiny_fresh'; }
					else { icon_class = 'icon_tiny_rotten'; }
					$('#content .movie:nth-child(' + (x+1) + ')').append('<p><span class="' + icon_class + '"></span> <a href="#' + x + '">' + temp.title + '</a> <span>(' + temp.mpaa_rating + ')</span></p>');
					$('#content .movie:nth-child(' + (x+1) + ')').append('<div class="critique">"' + temp.critics_consensus + '"</div>');
					$('#content .movie:nth-child(' + (x+1) + ')').append('<div class="tweets"><p>Loading Tweets...</p>');
					
					// Twitter magic
					$('#content .movie:nth-child(' + (x+1) + ') p:first-child a').bind('click', function(e) {
						e.preventDefault();
						// Get the index of the current movie
						var index = parseInt($(this).attr('href').slice(1)) + 1;
						// Reset the list + "Loading"
						$('#content .movie:nth-child(' + (index) + ') div.tweets').html('<p>Loading Tweets...</p><ul></ul>');
						$.ajax({
							method: 'get',
							dataType: 'json',
							url: 'includes/twitter.php?x=' + index + '&title=' + $(this).text(),
							success: function(data) {
								console.log(data);
								$('#content .movie:nth-child(' + (index) + ') div.tweets').html('<ul></ul>');
								for(x=0; x<data.results.length; x++) {
									var tweet = '<li><a class="username" href="http://twitter.com/' + data.results[x].from_user + '">' + data.results[x].from_user + '</a>: ' + replaceURLs(data.results[x].text) + '</li>';
									$('#content .movie:nth-child(' + (index) + ') div.tweets ul').append(tweet);
								}
								// Remove the "Loading"
								$('#content .movie:nth-child(' + (index) + ') div.tweets p').remove();
							},
							error: function(data) {
								console.log('Error (Twitter): ' + data);
								$('#content .movie:nth-child(' + (index) + ') div.tweets').html('Error loading Tweets.');
							}
						});
					});
					
					// Trigger the tweets!
					$('#content .movie:nth-child(' + (x+1) + ') p:first-child a').trigger('click');
				}
			},
			error: function(data) {
				console.log('Error (Rotten Tomatoes): ' + data);
				$('#content').html('Error loading Rotten Tomatoes data.'); // Reset content element
			}
		});
	});
	// Set this thing in motion!
	$('h1 a').trigger('click');
});

// Found this crazy link-making solution @ http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
function replaceURLs(text) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
//	return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
	// If this wasn't XTHML 1.0 Strict, I'd use the target all day.
	return text.replace(exp,"<a href='$1'>$1</a>"); 
}