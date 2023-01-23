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

