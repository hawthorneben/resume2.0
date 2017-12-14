<?php
    // Connecting, selecting database
    $dbUsername = 'root';
    $dbPassword = 'benthorn';
    try {
        $connection = new PDO('mysql:host=localhost;dbname=site', $dbUsername, $dbPassword, array( PDO::ATTR_PERSISTENT => true));
     } 
     catch (PDOException $e) {
         print "Error!: " . $e->getMessage() . "<br/>";
         die();
     }
?>