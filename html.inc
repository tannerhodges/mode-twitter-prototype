<!DOCTYPE html5>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>Tweetoes | Rotten Tomatoes + Twitter</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    
    <!-- Styles -->
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/styles.css" />
    <!-- End Styles -->

  </head>
  <body>

    <h1><a href="#">Rotten Tweetoes</a></h1>

    <p>
      <small>
        <?php
          // Display a tweet
          echo "Tweets returned: " . count( $content->statuses ) . "<br />";
          echo "Tweet #1: \"" . $content->statuses[0]->text . "\"<br />";
        ?>
        If you are having issues try <a href='./clearsessions.php'>clearing your session</a>.
      </small>
    </p>

    <div id="content"><p>Loading Movies...</p></div>

    <!-- Scripts -->
    <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="js/semesterProject.js"></script>
    <!-- End Scripts -->

  </body>
</html>
