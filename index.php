<?php /* MODE Twitter Prototype */ ?>

<!DOCTYPE html5>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <title>Twitter Prototype | MODE</title>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./css/bootstrap.min.css" />
    </head>
    <body>
        <div class="container">
            <h1>Twitter Prototype</h1>

            <?php
                /* Settings
                 * -------------------------------------------------------------
                 */
                $twitter_account = 'mattr_co';
                $num_tweets = 1;


                /* OAuth
                 * -------------------------------------------------------------
                 * @see https://github.com/abraham/twitteroauth
                 */
                    // Load required lib files
                    require_once('./twitteroauth/twitteroauth.php');
                    require_once('./config.php');

                    // Prepare a connection using a preset token
                    function getConnectionWithAccessToken($oauth_token, $oauth_token_secret) {
                      $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $oauth_token, $oauth_token_secret);
                      return $connection;
                    }

                    // Open connection
                    $connection = getConnectionWithAccessToken(OAUTH_TOKEN, OAUTH_TOKEN_SECRET);


                /* Pull content from Twitter
                 * -------------------------------------------------------------
                 * @see https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
                 * @see /misc/sample-twitter-query-result.txt
                 */
                $tweets = $connection->get("statuses/user_timeline",
                    array(
                        'screen_name' => $twitter_account,
                        'lang' => 'en',
                        'count' => $num_tweets,
                        'result_type' => 'mixed',
                        'include_entities' => 'true'
                    )
                );


                /* Display Tweets
                 * -------------------------------------------------------------
                 * @see /misc/sample-twitter-status-object.txt
                 * @see https://dev.twitter.com/docs/entities
                 */
                // Loop through tweets and display the latest
                for ($i=0; $i < $num_tweets; $i++) {
                    // Save tweet data
                    $username = $tweets[$i]->user->name;
                    $handle = '@' . $tweets[$i]->user->screen_name;
                    $profile_url = 'http://twitter.com/' . substr($handle,1);
                    $profile_picture = $tweets[$i]->user->profile_image_url;
                    $content = linkify_tweet($tweets[$i]->text);
                    $timestamp = _ago(strtotime($tweets[$i]->created_at));

                    // HTML output ?>
                    <div>
                        <img src="<?=$profile_picture;?>" alt="" />
                            <div>
                                <?=$username;?>
                                <a href="<?=$profile_url;?>"><?=$handle;?></a>
                                <span><?=$timestamp;?></span>
                                <p><?=$content;?></p>
                            </div>
                        </img>
                    </div>

            <?php } # End for($i < $num_tweets) ?>

        </div> <!-- End #container -->
    </body>
</html>

<?php

/* Functions
 * -------------------------------------------------------------
 */

// Time Ago Function
// @see http://css-tricks.com/snippets/php/time-ago-function/
function _ago($tm,$rcs = 0) {
    $cur_tm = time(); $dif = $cur_tm-$tm;

    // Customize time units
    // $pds = array('second','minute','hour','day','week','month','year','decade');
    $pds = array('S','M','H','D','W','M','Y','DEC');

    $lngh = array(1,60,3600,86400,604800,2630880,31570560,315705600);
    for($v = sizeof($lngh)-1; ($v >= 0)&&(($no = $dif/$lngh[$v])<=1); $v--); if($v < 0) $v = 0; $_tm = $cur_tm-($dif%$lngh[$v]);
    $no = floor($no);

    // Customize display
    // if($no <> 1) $pds[$v] .='s'; $x=sprintf("%d %s ",$no,$pds[$v]);
    $x=sprintf("%d%s ",$no,$pds[$v]);

    if(($rcs == 1)&&($v >= 1)&&(($cur_tm-$_tm) > 0)) $x .= time_ago($_tm);
    return $x;
}

// Convert plain text from tweet to functioning links
// @seehttps://github.com/madebymode/arbor-networks-infosec-dashboard/blob/master/feed/src/TwitterList.php
function linkify_tweet($tb) {
    $tb = ' ' . $tb;
    //usernames
    $tb = preg_replace('/(^|\s)@(\w+)/', '\1<a href="http://www.twitter.com/\2" target="_blank">@\2</a>', $tb);
    //hashtags
    $tb = preg_replace('/(^|\s)#(\w+)/', '\1<a href="http://search.twitter.com/search?q=%23\2" target="_blank">#\2</a>', $tb);
    //standard links
    $tb = preg_replace("#(^|[\n ])([\w]+?://[\w]+[^ \"\n\r\t<]*)#ise", "'\\1<a href=\"\\2\" target=\"_blank\">\\2</a>'", $tb);
    $tb = preg_replace("#(^|[\n ])((www|ftp)\.[^ \"\t\n\r<]*)#ise", "'\\1<a href=\"http://\\2\" target=\"_blank\">\\2</a>'", $tb);
    $tb = preg_replace("#(^|[\n ])([a-z0-9&\-_\.]+?)@([\w\-]+\.([\w\-\.]+\.)*[\w]+)#i", "\\1<a href=\"mailto:\\2@\\3\" target=\"_blank\">\\2@\\3</a>", $tb);

    return trim($tb);
}

?>