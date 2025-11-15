const serverCon = document.getElementById('server');
const dbCon = document.getElementById('db');
const loginCon = document.getElementById('login');
const passwordCon = document.getElementById('password');
const button = document.getElementById('connectBtn');
const message = document.getElementById('message');

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

button.addEventListener('click', async (e) => {
    e.preventDefault();
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