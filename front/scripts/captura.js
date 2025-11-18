import { checkAuth, getAllClients, getTipos } from "./helpers.js";


let loading = true;
const container = document.getElementById('container');
const spinner = document.getElementById('spinner');

//check auth

void checkAuth(spinner,container, loading);

const tiposRes = await getTipos();
const tipos = tiposRes.result;
const clientesRes = await getAllClients();
const clientes = clientesRes.result;

//continue
const table = document.getElementById('results');
const claveIn = document.getElementById('clave');
const nombreIn = document.getElementById('nombre');
const apellidosIn = document.getElementById('apellidos');
const sexoIn = document.getElementById('sexo');
const limiteIn = document.getElementById('limite');
const tipoIn = document.getElementById('tipo');
const messageRes = document.getElementById('messageRes');
const resultsContainer = document.getElementById('resultsContainer');


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
const errorCredito = document.getElementById('error-limitecredito');
const errorTipo = document.getElementById('error-tipo');

//Fill all dynamic inputs
tipos.forEach(t => {
    const option = document.createElement('option');
    option.text = t.tipnombre;
    option.value = t.tipid;
    tipoIn.appendChild(option);
})
clientes.forEach(c => {
    const html = `
        <tr id="${c.cliid}">
            <td></td>
            <td data-key="clave" data-value="${c.cliid}">${c.cliid}</td>
            <td data-key="nombre" data-value="${c.clinombre}">${c.clinombre}</td>
            <td data-key="apellidos" data-value="${c.cliApellidos}">${c.cliApellidos}</td>
            <td data-key="sexo" data-value="${c.cliSexo}">${c.cliSexo}</td>
            <td data-key="limiteCredito" data-value="${c.cliLimiteCredito}">${c.cliLimiteCredito}</td>
            <td data-key="tipo" data-value="${c.tipid}">${c.tipnombre}</td>
      </tr>
    `
    table.insertAdjacentHTML('beforeend', html);
})

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
    limiteIn.value = object.limiteCredito
    tipoIn.value = object.tipo;
}
const setClientByInputs = () => {
    client.clave = claveIn.value;
    client.nombre = nombreIn.value;
    client.apellidos = apellidosIn.value;
    client.sexo = sexoIn.value;
    client.limiteCredito = limiteIn.value;
    client.tipo = tipoIn.value;
}
const resetClient = (resetClave = true) => {
    if(resetClave) {
        client.clave = "";
    }
    client.nombre = "";
    client.apellidos = "";
    client.sexo = "";
    client.limiteCredito = 0;
    client.tipo = "";

    console.log(client.clave);
    setInputs(client);
}
const deleteSelectedElement = () => {
    const eleSelected = document.querySelector('.table__selected')
    if(eleSelected) eleSelected.classList.remove('table__selected');
}
const cleanErrors = () => {
    errorClave.textContent = "";
    errorClave.classList.add('noVisible');
    errorNombre.textContent = "";
    errorNombre.classList.add('noVisible');
    errorApellidos.textContent = "";
    errorApellidos.classList.add('noVisible')
    errorCredito.textContent = "";
    errorCredito.classList.add('noVisible')
    errorSexo.textContent = "";
    errorSexo.classList.remove('noVisible')
    errorTipo.textContent = "";
    errorTipo.classList.add('noVisible');
}

const validateForm = () => {
    let errorNombreB = false;
    let errorApellidosB = false;
    let errorCreditoB = false
    let errorSexoB = false;
    let errorClaveB = false;
    let errorTipoB = false

    if(+mode === 2){
        if(client.clave.trim() === ""){
            errorClave.textContent = "La clave no puede ir vacia";
            errorClave.classList.remove('noVisible');
            errorClaveB = true;
        }
        if(isNaN(+client.clave)){
            errorClave.textContent = "La clave tiene que ser un numero";
            errorClave.classList.remove('noVisible');
            errorClaveB = true;
        }
    }

    if(client.nombre.length < 3){
        errorNombre.textContent = "El nombre debe ser mayor a 2 caracteres";
        errorNombre.classList.remove('noVisible');
        errorNombreB = true;
    }
    if(client.nombre === "" || client.nombre.trim() === null){
        errorNombre.textContent = "El cliente no puede ir vacio";
        errorNombre.classList.remove('noVisible');
        errorNombreB = true;
    }
    if(client.apellidos.length < 3){
        errorApellidos.textContent = "El apellido debe ser mayor a 2 caracteres";
        errorApellidos.classList.remove('noVisible');
        errorApellidosB = true;
    }
    if(client.apellidos === "" || client.apellidos.trim() === null){
        errorApellidos.textContent = "El apellido no puede ir vacio";
        errorApellidos.classList.remove('noVisible');
        errorApellidosB = true;
    }

    if(client.limiteCredito < 0){
        errorCredito.textContent = "El credito no puede ser negativo"
        errorCredito.classList.remove('noVisible')
        errorCreditoB = true;
    }

    if(client.sexo === "" || client.sexo.trim() === null){
        errorSexo.textContent = "Por favor eliga una opcion"
        errorSexo.classList.remove("noVisible");
        errorSexoB = true;
    }
    if(client.tipo === ""){
        errorTipo.textContent = "Por favor seleccione un tipo";
        errorTipo.classList.remove("noVisible");
        errorTipoB = true;
    }

    if(!errorNombreB){
        errorNombre.textContent = "";
        errorNombre.classList.add('noVisible');
    }
    if(!errorApellidosB){
        errorApellidos.textContent = "";
        errorApellidos.classList.add('noVisible')
    }

    if(!errorCreditoB){
        errorCredito.textContent = "";
        errorCredito.classList.add('noVisible')
    }
    if(!errorSexoB){
        errorSexo.textContent = "";
        errorSexo.classList.add('noVisible')
    }

    if(!errorTipoB){
        errorTipo.textContent = "";
        errorTipo.classList.add('noVisible');
    }

    return !errorNombreB && !errorApellidosB && !errorCreditoB && !errorSexoB && !errorClaveB && !errorTipoB
}

editMode.addEventListener('click', (e) => {
    newMode.checked = false;
    claveIn.disabled = false;
    claveIn.placeholder = "";
    table.classList.remove('table__disabled');
    resetClient();
    mode = editMode.value;
    cleanErrors();
})
newMode.addEventListener('click', (e) => {
    editMode.checked = false;
    claveIn.disabled = true;
    claveIn.placeholder = "*";
    table.classList.add('table__disabled');
    deleteSelectedElement();
    resetClient();
    mode = newMode.value;
    cleanErrors()
})

cleanBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetClient();
    deleteSelectedElement();
})
const clientExists = () => {
    const exists = document.getElementById(client.clave);
    if(!exists && +mode === 2){
        messageRes.classList.remove('noVisible');
        messageRes.classList.add('form__message-f');
        messageRes.textContent = "No existe ningun cliente con ese id";

        setTimeout(() =>{
            messageRes.classList.add('noVisible');
            messageRes.classList.remove('form__message-f');
        },2000)
        return false;
    }
    return true;
}

saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    setClientByInputs();
    if(!clientExists()) return;
    if(!validateForm()){
        console.log("No se puede continuar por que algun error hubo en los inputs");
        return;
    }
    const url = "http://localhost:4000/api/saveClient"
    try{
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(client),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        const result = await response.json();
        const c = result.client;
        messageRes.classList.remove('noVisible');
        if(!response.ok){
            messageRes.classList.add('form__message-f');
            messageRes.textContent = result.error;
            setTimeout(() => {
                messageRes.classList.add('noVisible');
                messageRes.classList.remove('form__message-f');
            },2000)
            return;
        }
        if(+mode === 1){
            const html = `
            <tr id="${c.cliid}">
                <td></td>
                <td data-key="clave" data-value="${c.cliid}">${c.cliid}</td>
                <td data-key="nombre" data-value="${c.clinombre}">${c.clinombre}</td>
                <td data-key="apellidos" data-value="${c.cliApellidos}">${c.cliApellidos}</td>
                <td data-key="sexo" data-value="${c.cliSexo}">${c.cliSexo}</td>
                <td data-key="limiteCredito" data-value="${c.cliLimiteCredito}">${c.cliLimiteCredito}</td>
                <td data-key="tipo" data-value="${c.tipid}">${c.tipnombre}</td>
          </tr>
        `
            table.insertAdjacentHTML('beforeend', html);
        }
        if(+mode === 2){
            const parent = document.getElementById(c.cliid);
            parent.children[1].textContent = c.cliid;
            parent.children[1].dataset.value = c.cliid;
            parent.children[2].textContent = c.clinombre;
            parent.children[2].dataset.value = c.clinombre;
            parent.children[3].textContent = c.cliApellidos;
            parent.children[3].dataset.value = c.cliApellidos;
            parent.children[4].textContent = c.cliSexo;
            parent.children[4].dataset.value = c.cliSexo;
            parent.children[5].textContent = c.cliLimiteCredito;
            parent.children[5].dataset.value = c.cliLimiteCredito;
            parent.children[5].textContent = c.tipnombre;
            parent.children[5].dataset.value = c.tipid;
        }

        messageRes.classList.add('form__message-s');

        messageRes.textContent = result.message;
        setTimeout(() => {
            messageRes.classList.add('noVisible');
        },2000)

    }catch(e){
        console.log("AQUIUI")
        messageRes.classList.add('form__message-f');
        messageRes.textContent = e.message;
    }
})
deleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    errorClave.classList.add('noVisible');
    setClientByInputs();

    if(!clientExists()) return;

    if(!client.clave){
        errorClave.classList.remove('noVisible');
        errorClave.textContent = "La clave no puede ir vacia"
        return;
    }
    const url = "http://localhost:4000/api/deleteClient";
    try{
        const response = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify({clientId: client.clave}),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        const result = await response.json();
        messageRes.classList.remove('noVisible');
        if(!response.ok){
            messageRes.classList.add('form__message-f');
            messageRes.textContent = result.error;
            return;
        }
        messageRes.classList.add('form__message-s');
        messageRes.textContent = result.message;
        const parent = document.getElementById(client.clave);
        parent.remove();
        resetClient();

        setTimeout(() => {
            messageRes.classList.add('noVisible');
        },2000)
    }catch(e){
        messageRes.classList.add('form__message-f');
        messageRes.textContent = e.message;
    }
})

table.addEventListener('click', (e) => {
    if(+mode === 1) return;
    e.preventDefault();
    removePreviousSelectedElement();
    const element = e.target.parentNode;
    const id = element.id;
    if(!id && isNaN(+id) || id === "") return;
    element.classList.add('table__selected');
    //Fill client obj
    for(let i = 1; i < element.children.length; i++) {
        client[element.children[i].dataset.key] = element.children[i].dataset.value;
    }
    setInputs(client);
})
const removePreviousSelectedElement = () => {
    const previusSelected = document.querySelector('.table__selected');
    if(previusSelected) {
        previusSelected.classList.remove('table__selected');
    }
}
claveIn.addEventListener('input', (e) => {
    if(+mode === 1) return;
    const clave = e.target.value;
    removePreviousSelectedElement();
    if(!clave){
        resetClient();
        return;
    }
    const dataParent = document.getElementById(clave);
    if(!dataParent){
        client.clave = e.target.value;
        resetClient(false)
        return;
    }
    resultsContainer.scrollTop = dataParent.offsetTop;
    dataParent.classList.add('table__selected');
    for(let i = 1; i < dataParent.children.length; i++) {
        client[dataParent.children[i].dataset.key] = dataParent.children[i].dataset.value;
    }
    setInputs(client);
})
