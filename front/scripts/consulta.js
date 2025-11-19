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


const client = {
    clave : "",
    nombre: "",
    apellidos: "",
    sexo: '',
    limiteCreditoMin : 0,
    limiteCreditoMax : 0,
    tipo: ""
}

const table = document.getElementById('results');
const claveIn = document.getElementById('clave');
const nombreIn = document.getElementById('nombre');
const apellidosIn = document.getElementById('apellidos');
const sexoIn = document.getElementById('sexo');
const limiteInMin = document.getElementById('limiteMin');
const limiteInMax = document.getElementById('limiteMax');


const messageRes = document.getElementById('messageRes');
const tipoIn = document.getElementById('tipo');

const searchBtn = document.getElementById('searchBtn');


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

//Fill all dynamic inputs
tipos.forEach(t => {
    const option = document.createElement('option');
    option.text = t.tipnombre;
    option.value = t.tipid;
    tipoIn.appendChild(option);
})

const setClientByInputs = () => {
    client.clave = claveIn.value;
    client.nombre = nombreIn.value;
    client.apellidos = apellidosIn.value;
    client.sexo = sexoIn.value;
    client.limiteCreditoMin = limiteInMin.value;
    client.limiteCreditoMax = limiteInMax.value;
    client.tipo = tipoIn.value;
}

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    setClientByInputs();

    try{
        const res = await fetch('http://localhost:4000/api/searchClient', {
            method: 'POST',
            body: JSON.stringify({ client : client }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        const data = await res.json();
        const result = data.result;

        if(!res.ok){
            return;
        }
        table.innerHTML = `
            <thead>
                <td style="width: 30px; text-align: center">*</td>
                <td>Clave</td>
                <td>Nombre</td>
                <td>Apellidos</td>
                <td>Sexo</td>
                <td>LimiteCredito</td>
                <td>Tipo</td>
            </thead>
        `;

        result.map(c => {
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
    }catch(e){
        messageRes.textContent = e.message;
        messageRes.classList.add('form__message-f');
    }
})