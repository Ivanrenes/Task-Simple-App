<?php 
  /*Taerme todas las tareas */
  include('database.php');
  $query = "SELECT * from task";
  $result = mysqli_query($connection, $query);

  if(!$result){
      die('Query failed '. mysqli_error($connection));
  }


  $json = array();
  while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
  }

  $jsonString = json_encode($json);
        echo $jsonString;


  
?>