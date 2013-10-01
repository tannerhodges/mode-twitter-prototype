<?php

// ADD VALIDATION REQUIREMENTS

// Get parameters from AJAX request
$x = $_GET['x'] + 1;
$title = urlencode($_GET['title']);

// Load required lib files
require_once('../twitteroauth/twitteroauth.php');
require_once('../config.php');

// Prepare a connection using a preset token
function getConnectionWithAccessToken($oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $oauth_token, $oauth_token_secret);
  return $connection;
}

// Open connection
$connection = getConnectionWithAccessToken(OAUTH_TOKEN, OAUTH_TOKEN_SECRET);

// Pull sample content from Twitter
$content = $connection->get("search/tweets",
	array(
		'q' => $title,
		'lang' => 'en',
		'count' => '5',
		'result_type' => 'mixed',
		'include_entities' => 'true'
	)
);

// Print index for parent script to accurately place data in the DOM
// Note: Elements with class "movie" are referenced by index
print '{ "x": ' . $x . ', ';

// Remove first character from the encoded data (i.e, the opening bracket, '{') to prevent parsing error
print substr( json_encode($content), 1 );

?>