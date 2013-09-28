<?php session_start();

// Load required lib files
require_once('twitteroauth/twitteroauth.php');
require_once('config.php');

// Prepare a connection using a preset token
function getConnectionWithAccessToken($oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken(OAUTH_TOKEN, OAUTH_TOKEN_SECRET);
$content = $connection->get("search/tweets",
	array(
		'q' => 'twitter',
		'lang' => 'en',
		'count' => '5',
		'result_type' => 'mixed',
		'include_entities' => 'true'
	)
);

/* Include HTML to display on the page */
include('html.inc');
