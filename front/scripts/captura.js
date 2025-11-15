import { checkAuth } from "./helpers.js";

let loading = true;
const container = document.getElementById('container');
const spinner = document.getElementById('spinner');

//check auth
void checkAuth(spinner,container, loading);

//continue
const table = document.getElementById('results');
const claveIn = document.getElementById('clave');
const nombreIn = document.getElementById('nombre');
const apellidosIn = document.getElementById('apellidos');
const sexoIn = document.getElementById('sexo');
const limiteIn = document.getElementById('limite');
const tipoIn = document.getElementById('tipo');

//btns
const cleanBtn = document.getElementById('cleanBtn');
const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteBtn');

//radios
const newMode = document.getElementById('nuevo');
const editMode = document.getElementById('modificar');

let mode = 1;

//Errors
const errorClave = document.getElementById('error-clave');
const errorNombre = document.getElementById('error-nombre');
const errorApellidos = document.getElementById('error-apellidos');
const errorSexo = document.getElementById('error-sexo');
const errorLimite = document.getElementById('error-limitecredito');
const errorTipo = document.getElementById('error-tipo');

//client
const client = {
    clave : "",
    nombre: "",
    apellidos: "",
    sexo: '',
    limiteCredito : 0,
    tipo: ""
}
const setInputs = (object) => {
    claveIn.value = object.clave;
    nombreIn.value = object.nombre;
    apellidosIn.value = object.apellidos;
    sexoIn.value = object.sexo;
    client.limiteCredito = object.limiteCredito
    tipoIn.value = object.tipo;
}
const setClientByInputs = () => {
    client.clave = claveIn.value;
    client.nombre = nombreIn.value;
    client.apellidos = apellidosIn.value;
    client.sexo = sexoIn.value;
    client.limiteCredito = limiteIn.limiteCredito;
    client.tipo = tipoIn.value;
}
const resetClient = () => {
    client.clave = "";
    client.nombre = "";
    client.apellidos = "";
    client.sexo = "";
    client.limiteCredito = 0;
    client.tipo = "";
    setInputs(client);
}
const deleteSelectedElement = () => {
    const eleSelected = document.querySelector('.table__selected')
    if(eleSelected) eleSelected.classList.remove('table__selected');
}
const validateForm = () => {
    if(!(client.nombre.length > 2)){
        errorNombre.textContent = "El nombre debe ser mayor a 2 caracteres";
        errorNombre.classList.remove('noVisible');
    }
    if(client.nombre === "" || client.nombre.trim() === null){
        console.log("Esta vacio el cliente")
        errorNombre.textContent = "El cliente no puede ir vacio";
        errorNombre.classList.remove('noVisible');
    }
    if(!(client.apellidos.length > 2)){
        errorApellidos.textContent = "El apellido debe ser mayor a 2 caracteres";
        errorApellidos.classList.remove('noVisible');
    }
    if(client.apellidos === "" || client.apellidos.trim() === null){
        errorApellidos.textContent = "El apellido no puede ir vacio";
        errorApellidos.classList.remove('noVisible');
    }
}

editMode.addEventListener('click', (e) => {
    newMode.checked = false;
    table.classList.remove('table__disabled');
    mode = editMode.value;
})
newMode.addEventListener('click', (e) => {
    editMode.checked = false;
    table.classList.add('table__disabled');
    deleteSelectedElement();
    resetClient();
    mode = newMode.value;
})

cleanBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetClient();
    deleteSelectedElement();
})

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setClientByInputs();
    validateForm();
    try{
        //llamar api
    }catch(e){

    }
})
deleteBtn.addEventListener('click', (e) => {
    try{

        //llamar api
    }catch(e){

    }
})

table.addEventListener('click', (e) => {
    if(+mode === 1) return;
    e.preventDefault();
    const previusSelected = document.querySelector('.table__selected');
    //check if there is any other selected element
    if(previusSelected) {
        previusSelected.classList.remove('table__selected');
    }
    const element = e.target.parentNode;
    const id = element.id;
    if(!id && isNaN(+id) || id === "") return;
    element.classList.add('table__selected');
    //Fill client obj
    for(let i = 1; i < element.children.length; i++) {
        client[element.children[i].dataset.key] = element.children[i].dataset.value;
    }
    setInputs(client);
    console.log(client)
})
