<?php 

include('database.php');

if(isset($_POST['id'])){
    $id = $_POST['id'];
    $query = "DELETE FROM task WHERE id = $id";
    $Result= mysqli_query($connection, $query);

    if(!$Result){
        die('Consulta fallida.');
    }
    echo "task delet successfully";
}



?>