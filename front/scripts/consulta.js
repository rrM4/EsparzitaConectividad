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