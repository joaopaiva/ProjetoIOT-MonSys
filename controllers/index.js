var db = firebase.database()

// JANELA
var janela = document.getElementById('sensorJan');
var btJanela = document.getElementById('btJanela');
var  btJanelaText = document.getElementById('btJanelaText');

btJanela.addEventListener('click', function(){
    createJan('Fechada');
});

function createJan(estado){
    var data = {
        estado: estado,
        time: Date.now()
    }

    return db.ref().child('usuarios/hVAeeWSc1agQ4qHyBix2jeGPd0F3/dados/janela').push(data);
}

// ESTADO DA JANELA
db.ref('usuarios/hVAeeWSc1agQ4qHyBix2jeGPd0F3/dados/janela').on('child_added', function(snapshot){
    
    janela.innerHTML = snapshot.val().estado

    if(janela.innerText == "Aberta"){
        btJanelaText.innerHTML = "Fechar Janela"
    }
    else if(janela.innerText == "Fechada"){
        btJanelaText.innerHTML = "Abrir Janela"
    }
})


// TEMPERATURA
var temperatura = document.getElementById('sensorTemp');
var btTemp = document.getElementById('btTemp');

btTemp.addEventListener('click', function(){
    createTemp(30, 'Desligado');
});

function createTemp(valor,estado){
    var data = {
        estado: estado,
        valor: valor,
        time: Date.now()
    }

    return db.ref().child('usuarios/hVAeeWSc1agQ4qHyBix2jeGPd0F3/dados/temperatura').push(data);
}

//ESTADO DA TEMPERATURA
/* db.ref('usuarios/hVAeeWSc1agQ4qHyBix2jeGPd0F3/dados/temperatura').on('child_added', function(snapshot){
    
    temperatura.innerHTML = snapshot.val().estado

    if(temperatura.innerText == "Ligado"){
        btJanela.innerHTML = "Desligar Ventilador"
    }
    else if(temperatura.innerText == "Desligado"){
        btJanela.innerHTML = "Ligar Ventilador"
    }
}) */