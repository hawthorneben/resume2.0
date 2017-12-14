<?php
    $name = $_POST['contactName'];
    $email = $_POST['contactEmail'];
    $subject = $_POST['contactSubject'];
    $message = $_POST['contactMessage'];

    include ('db_connect.php');

    $statement = $connection->prepare('insert into contact values (:name, :email, :subject, :message)');

    $statement->execute(array(":name"=>$name, ":email"=>$email,
                                ":subject"=>$subject, ":message"=>$message));

    echo "<script>window.location='thankyou.php'</script>";
?>