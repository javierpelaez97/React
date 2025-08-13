Requisitos
1-Vista principal con:

    Lista de tareas obtenidas desde una API falsa (https://jsonplaceholder.typicode.com/users/1/todos).

    Botón para añadir una tarea.

    Botón para marcar tareas como completadas.

    Botón para eliminar tareas.

2-Formulario de nueva tarea:

    Input para el título.

    Botón de guardar.

    Validación (no permitir título vacío).

3-Lógica con Hooks de React:

    useState para manejar el estado de las tareas y los inputs.

    useEffect para cargar las tareas desde la API al iniciar.

    useReducer para manejar el estado de las tareas (añadir, eliminar, actualizar).

    Custom Hook para gestionar la API (useFetch para GET/POST/DELETE).

4-Extras opcionales (si quieres más reto):

    Filtro para mostrar solo tareas completadas / pendientes.

    Contador de tareas pendientes (puedes usar useMemo).

    Manejar estados de carga y error con useFetch.

    Guardar el estado en localStorage con otro custom hook (useLocalStorage).