<?php

// Specify character set in HTTP headers for better load time
header('Content-type: application/json; charset=utf-8');

include('keys.php');

$tomatoJSON = file_get_contents("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=10&page=1&country=us&apikey=" . RT_KEY);
print $tomatoJSON;
// $jsonDecoded = json_decode($tomatoJSON);

?>