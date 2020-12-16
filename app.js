/* Coneccion */
$(function(){
    let edit = false;
    $('#task-result').hide();
    fetchTask(); /*Esto le dice al navegador que se ejecute la funcion apenas se inicialice la aplicacion */
    /* Creamos una funcion delay la cual recibe dos parametros el callback, y los milisegundos */
    function delay(callback, ms){
        /* Creamos una variable timer la cual se unicializa en 0 */
        var timer = 0;
        /*Retornamos una funcion*/
        return function(){
        /*  */
            var context = this,
            args = arguments;
            clearTimeout(timer);
        /*Limpiamos la variable timer por si algún x o y motivo tiene un setTimeout */
            timer = setTimeout(function () {
                /*Le aplicamos un setTimeout a la variable timer */

                callback.apply(context, args);
                /*Aplicamos un callback de nuestro contexto
                los argumentos y los milisegundos */
              }, ms || 0);

        }
    }
    /*Si se hace un Keyup comieza a realizar la funcion delay
    la cual traera el contexto  de la funcion, una ves ya se terminen los 500 ms despues
    de haber presionado la ultima tecla, esto contaria como una consulta, despues cuando se presione otra tecla volveria
    a hacer el mismo ciclo hasta que acaben los 500ms  */

    /*Esto se inicia cuando oprimimos una tecla y la soltamos */
    $('#search').keyup(delay(function(){

            if($('#search').val( )){

                 let search =$('#search').val();
                 console.log(search)

                 $.ajax({
                 url: 'task-search.php',
                 type : 'POST',
                 data: {search},

                 success: function(response){

                     let tasks = JSON.parse(response);

                     let template = '';

                     tasks.forEach(task => {
                         template += `<li>
                         ${task.name}
                         </li>`
                         $('#container').html(template)
                         $('#task-result').show();
                     });
                 }
             });
            }
         }, 500));

    /*Esto se inicia cuando hacemos un post con el botón save */
    $('#task-form').submit(function(e){

        const postData = {
            name : $('#name').val(),
            description :$('#description').val(),
            id : $('#taskId').val(),
        };

             let url = edit === false ? 'task-add.php' : 'task-edit.php';/*Ternarios */
              console.log(url)
        $.post(url, postData,function(response){
                console.log(response)
                fetchTask();
                $('#task-form').trigger('reset');
                /*Seleccionamos el formulario le damos un .tigger
                reset para que despues de hacer post a la abse de datos
                se reinicia el formulario */
        })

        e.preventDefault();

    })


    /*Esto se inicia cando se inicia mi aplicación */
   function fetchTask(){

    $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function(response){

                let tasks = JSON.parse(response)
                let template = '';

                tasks.forEach(task => {



                    template +=
                    `<div class="card card-body mt-2 border-primary csstyle">
                                                   
                    
                            <h1 class="idnumber text-warning" TaskId="${task.id}" >${task.id}</h1>
                            <h3>${task.name}</h3>
                            <ul class="description"><li>${task.description}</li></ul>
                 
                            
                        <form>
                            <buttom  class="btn btn-outline-primary task-delete" >Delete 🗑</buttom>
                            <buttom  class="btn btn-outline-primary task-edit" >Edit 🍑</buttom>
                        </form>
               
                                        
                        </div>`
                });
                $('#task').html(template)
            }
        })

   }

   /*Lo que hice fue, quiero que cuando haga un click en
   el boton con la clase task-delete me entre a la función,
   this me treria el boton en formato html y le digo que lo traiga
   desde el elemento padre esto entrara al div que es el elemento padre
   por el cual viene el boton*/

   $(document).on('click', '.task-delete', function(){

       if(confirm('Are you sure you want to delete it ?')){
        let element = $(this)[0].parentElement.parentElement;
        /*id va a ser igual a elemento que trae el botón */
        let id = $(element).find('h1').attr('TaskId');
        /*Le digo que id tomara lo que viene de element en el elemento padre
        tendra un elemento hijo el cual es un h1 que tiene un atributo
        y que quiero ese atributo */
        $.post('task-delete.php', {id},function(response){
            fetchTask();
        })
       }
   });

   //*Esto hace que cuando presionemos en el boton edit lo seleccione mediante la clase */
   $(document).on('click', '.task-edit', function(){
       /*Cuando presionemos el boton este recibira unos parametros, con this hacemos referencia a esos parametros de esa funcion */
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).find('h1').attr('TaskId');
        console.log(this)

        $.post('task-sigle.php', {id}, function(response){
            let task = JSON.parse (response);

            $('#name').val(task.name);
            $('#description').val(task.description)
            $('#taskId').val(task.id)
            edit = true;

        })

    })

})




