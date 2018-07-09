<html> 
<head></head> 
<body> 
<h1>natas15</h1> 
<div id="content"> 
<? 

/* 
CREATE TABLE `users` ( 
  `username` varchar(64) DEFAULT NULL, 
  `password` varchar(64) DEFAULT NULL 
); 
*/ 

if(array_key_exists("username", $_REQUEST)) { 
    $link = mysql_connect('localhost', 'natas15', '<censored>'); 
    mysql_select_db('natas15', $link); 
     
    $query = "SELECT * from users where username=\"".$_REQUEST["username"]."\""; 
    if(array_key_exists("debug", $_GET)) { 
        echo "Executing query: $query<br>"; 
    } 

    $res = mysql_query($query, $link); 
    if($res) { 
        if(mysql_num_rows($res) > 0) { 
            echo "This user exists.<br>"; 
        } else { 
            echo "This user doesn't exist.<br>"; 
        } 
    } else { 
        echo "Error in query.<br>"; 
    } 
    mysql_close($link); 
} else { 
?> 

<form action="index.php" method="POST"> 
Username: <input name="username"><br> 
<input type="submit" value="Check existence" /> 
</form> 
<? } ?> 
<div id="viewsource"><a href="index-source.html">View sourcecode</a></div> 
</div> 
</body> 
</html> 