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
    <div id="content"><p>Loading Movies...</p></div>

    <p>If you are having issues try <a href='./clearsessions.php'>clearing your session</a>.</p>

    <hr />
    <?php if (isset($menu)) { ?>
      <?php echo $menu; ?>
    <?php } ?>

    <?php if (isset($status_text)) { ?>
      <?php echo '<h3>'.$status_text.'</h3>'; ?>
    <?php } ?>
    <p>
      <pre>
        <?php print_r($content); ?>
      </pre>
    </p>

    <!-- Scripts -->
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/semesterProject.js"></script>
    <!-- End Scripts -->

  </body>
</html>
