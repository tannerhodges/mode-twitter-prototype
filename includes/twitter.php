<?php

include('keys.php');

$x = $_GET['x'] + 1;
$title = urlencode($_GET['title']);

$twitterJSON = file_get_contents("http://search.twitter.com/search.json?q=$title&rpp=5&lang=en&include_entities=true&result_type=mixed");
print '{ "x": ' . $x ;
if($twitterJSON) { print ', ' . substr($twitterJSON, 1); }
else { print '}'; }

?>