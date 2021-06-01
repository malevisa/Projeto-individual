let login_usuario;
let usuario;
let idUsuario;

function redirecionar_login() {
    window.location.href = 'index.html';
}

function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    usuario = sessionStorage.usuario_meuapp;
    idUsuario = sessionStorage.id_usuario_meuapp;
    
    if (login_usuario == undefined)  {
        redirecionar_login();
    } else {
        b_usuario.innerHTML = usuario;
        validar_sessao();
    }
    
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, {cache:'no-store'})
    .then(resposta => {
        if (resposta.ok) {
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);    
            });
        } else {
            console.error('Sessão :.( ');
            logoff();
        } 
    });    
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, {cache:'no-store'}); 
}