<?php 

    include('database.php');

    $search = $_POST['search']; /* search guarda los datos que mando al servidor  */

    if(!empty($search)){
        $query = "SELECT * FROM task WHERE name LIKE '$search%'";
        /*Lo que hacemos con la varible query es ir a la tabla task y 
        comparar si lo que viene por search es o tiene alguna simmilitud 
        con lo que esta en la tabla */
        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Query Error 🖕🏻'. mysqli_error($connection));
        }
        /*Result lo que hace es que trae la connection y trae la
         comparación de la tabla task con lo que venga de search */
        
        $json = array();
        /*Creamos una variable la cual sera igual a un array */
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                'name' => $row['name'],
                'description' => $row['description'],
                'id' => $row['id']
            );
        }
            /*Hacemos un ciclo recorremos el resultado lo traiga 
        y este se va a convertir en un array el cual name 
        hace referencia a la tabla name de mi base de datos
        y todos estos datos como name se guardaran en una variable row
        TODO: por ejemplo: si el search trae la palabra ivan este primero llegara
        a la funcion luego de esto hace la consulta con el select
        a mi tabla task culumna name y hace la comparación si esta no es 
        parecida a ninguna pues de igual manda el array vacio */
        $jsonString = json_encode($json);
        echo $jsonString;
    }

?>