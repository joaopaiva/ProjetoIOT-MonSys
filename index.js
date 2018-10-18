var db = firebase.database()

//colocar o listener de mudança no filho
var mqtt = require('mqtt');
var client = mqtt.connect('ws://broker.mqttdashboard.com:8000/mqtt');

client.on("connect", function(){	
    client.subscribe('monsys/estadoJanela')
    console.log("connected and sending message!");

    client.publish('monsys/estadoJanela', 'ab')
})

client.on('message', (topic, message) => {
    switch(topic){
        case 'monsys/estadoJanela':
            console.log('received message %s %s', topic, message)
    }
    
    console.log('Opening window')
})

document.getElementById('sensorUm').innerHTML = 'Teste';

// JANELA
var janela = document.getElementById('sensorJan');
var btJanela = document.getElementById('btJanela');
var btJanelaText = document.getElementById('btJanelaText');

btJanela.addEventListener('click', function(){
    createJan('Aberta');
});

function createJan(estado){
    var data = {
        estado: estado,
        time: Date.now()
    }

    return db.ref().child('usuarios/dados/janela').push(data);
}

// ESTADO DA JANELA
db.ref('usuarios/dados/janela').on('child_added', function(snapshot){
    
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
var btTempText = document.getElementById('btTempText');
var valorTemp = 40;
var estadoVentilador = 'Ligado';

btTemp.addEventListener('click', function(){
    createTemp(valorTemp, estadoVentilador);
});

function createTemp(valor,estado){
    var data = {
        estado: estado,
        valor: valor,
        time: Date.now()
    }

    return db.ref().child('usuarios/dados/temperatura').push(data);
}

//ESTADO DA TEMPERATURA
db.ref('usuarios/dados/temperatura').on('child_added', function(snapshot){

    estadoVentilador = snapshot.val().estado

    if(estadoVentilador == "Ligado"){
        temperatura.innerHTML = snapshot.val().valor;
        btTempText.innerHTML = "Desligar Ventilador"
    }
    else if(estadoVentilador == "Desligado"){
        temperatura.innerHTML = snapshot.val().valor;
        btTempText.innerHTML = "Ligar Ventilador"
    }
})

// UMIDADE
var umidade = document.getElementById('sensorUm');

function createUmidade(valor){
    var data = {
        valor: valor,
        time: Date.now()
    }

    return db.ref().child('usuarios/dados/umidade').push(data);
}

//ESTADO DA UMIDADE
db.ref('usuarios/dados/umidade').on('child_added', function(snapshot){
    
    umidade.innerHTML = snapshot.val().umidade

})

// LUMINOSIDADE
var luminosidade = document.getElementById('sensorLum');
var btLum = document.getElementById('btLum');
var btLumText = document.getElementById('btLumText');
var valorLum = 30;
var estadoLuz = 'Desligado';

btLum.addEventListener('click', function(){
    createLum(valorLum, estadoLuz);
});

function createLum(valor,estado){
    var data = {
        estado: estado,
        valor: valor,
        time: Date.now()
    }

    return db.ref().child('usuarios/dados/luminosidade').push(data);
}

//ESTADO DA LUMINOSIDADE
db.ref('usuarios/dados/luminosidade').on('child_added', function(snapshot){
    
    estadoLuz.innerHTML = snapshot.val().estado

    if(estadoLuz == "Ligado"){
        luminosidade.innerHTML = snapshot.val().valor;
        btLumText.innerHTML = "Desligar Ventilador"
    }
    else if(estadoLuz == "Desligado"){
        luminosidade.innerHTML = snapshot.val().valor;
        btLumText.innerHTML = "Ligar Ventilador"
    }
})