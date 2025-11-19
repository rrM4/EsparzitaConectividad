const serverCon = document.getElementById('server');
const dbCon = document.getElementById('db');
const loginCon = document.getElementById('login');
const passwordCon = document.getElementById('password');
const button = document.getElementById('connectBtn');
const message = document.getElementById('message');

const errorServer = document.getElementById('error-server');
const errorDb = document.getElementById('error-db');
const errorLogin = document.getElementById('error-login');
const errorPassword = document.getElementById('error-password');

//redirect buttons
const capturaBtn = document.getElementById('capturaBtn');
const consultaBtn = document.getElementById('consultaBtn');

let server;
let db;
let login;
let password;




serverCon.addEventListener('change', (e) => {
    server = e.target.value;
})
dbCon.addEventListener('change', (e) => {
    db = e.target.value;
})
loginCon.addEventListener('change', (e) => {
    login = e.target.value;
})
passwordCon.addEventListener('change', (e) => {
    password = e.target.value;
})

const validateForm = () => {
    let serverErrorF = false;
    let dbErrorF = false;
    let loginErrorF = false;
    let passwordErrorF = false;


    if(!server || server.trim() === ""){
        errorServer.classList.remove('noVisible');
        errorServer.textContent = "El server no puede ir vacio"
        serverErrorF = true;
    }

    if(!db || db.trim() === ""){
        errorDb.classList.remove('noVisible');
        errorDb.textContent = "La base de datos no puede ir vacía";
        dbErrorF = true;
    }

    if(!login || login.trim() === ""){
        errorLogin.classList.remove('noVisible');
        errorLogin.textContent = "El login no puede ir vacío";
        loginErrorF = true;
    }

    if(!password || password.trim() === ""){
        errorPassword.classList.remove('noVisible');
        errorPassword.textContent = "El password no puede ir vacío";
        passwordErrorF = true;
    }

    return !serverErrorF && !dbErrorF && !loginErrorF && !passwordErrorF;
}

const cleanErrors = () => {
    errorServer.classList.add('noVisible');
    errorServer.textContent = "";

    errorDb.classList.add('noVisible');
    errorDb.textContent = "";

    errorLogin.classList.add('noVisible');
    errorLogin.textContent = "";

    errorPassword.classList.add('noVisible');
    errorPassword.textContent = "";
}



button.addEventListener('click', async (e) => {
    e.preventDefault();
    cleanErrors();
    if(!validateForm()) return;
    try{
        const response = await fetch('http://localhost:4000/api/connect', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                user: login,
                password: password,
                server: server,
                database: db
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if(response.ok){
            // redirect
            message.classList.add('form__message-s');
            message.classList.remove('form__message-f');
            message.textContent = data.message;
            capturaBtn.disabled = false;
            consultaBtn.disabled = false
            return;
        }
        //display error
        message.classList.add('form__message-f');
        message.classList.remove('form__message-s');
        message.textContent = data.error;
        capturaBtn.disabled = true;
        consultaBtn.disabled = true;
    }catch(err){
        const message = document.getElementById('message');
        message.textContent = err.message;
    }
})

capturaBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:8080/view/captura.html';
});

consultaBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:8080/view/consulta.html';
})