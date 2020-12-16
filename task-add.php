<?php
    include('database.php');

    /*Si existe un post con un objeto name entonces */
    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $description = $_POST['description'];
        // query es la consulta o Insert a la base de datos
        $query = "INSERT  into task (name, description) VALUES ('$name', '$description')";

        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Consulta fallida. 🦔');
        }
        
    }
   

?>