const loading = document.querySelector('.loading');
const principalUser = document.querySelector('.login input');
const newMsg = document.querySelector('.enviar > div input');
const user = {
    from: "",
    to: "Todos",
    text: "",
    type: "message"
}

// INPUT TELA INICIAL - CAPTURA DO NOME DO USUARIO 
function userName() {
    user.from = document.querySelector('.login input').value;

    if(user.from.length > 0){

        activeUser = {
            name: user.from
        }

        showSecondLayout()
        const backTo = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', activeUser);
        backTo.then(newUser);
        backTo.catch(userExit);

    }else{
        alert('Por favor, digite seu nome:')
    }

    setInterval(statusVerify, 5000)
}

// PRESS ENTER TELA INICIAL

principalUser.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        userName();
    }
})

// BUSCANDO NOVOS USUARIOS DO SERVIDOR

function newUser() {

    searchMessage();
    searchUser()

    setTimeout(firtsLayoutHidden , 2000 )
    setInterval(searchUser, 20000)
    setInterval(searchMessage, 3000)
}

// SEGUNDA TELA - LOADING

function showSecondLayout(){
    const inputTela = document.querySelector('.input-primeira-tela')
    loading.classList.remove('hidden')
    inputTela.classList.add('hidden')
}

function firtsLayoutHidden(){
    const login = document.querySelector('.login')
    login.classList.remove('login')
    loading.classList.add('hidden')
}

// VERIFICAÇÃO DA EXISTENCIA DO NOME DO USUÁRIO

function userExit(erro) {
    alert('Erro ' + erro.request.status + " Usuario já exite")
    window.location.reload()
}

// RESPONSE.DATA STATUS USUÁRIO

function verify(response) {
    console.log('staus: ' + response.data);
}

function noUser(){
    window.location.reload()
}

function statusVerify() {
    const status = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', activeUser);
    status.then(verify);
    status.catch(noUser)

}

// BUSCAR MENSAGENS DO SERVIDOR

function searchMessage() {
    const retorno = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    retorno.then(loadingMessage);
    retorno.catch(userExit);
}

function loadingMessage(serverMessage) {
    let receivedMessage = serverMessage.data
    configMessage(receivedMessage)

}

