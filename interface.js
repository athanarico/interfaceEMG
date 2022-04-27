const firebaseConfig = {
  apiKey: "AIzaSyBRf_YmBfbrAyl3ASsRa-563ma545qbohI",

  authDomain: "interface-6d928.firebaseapp.com",

  databaseURL: "https://interface-6d928-default-rtdb.firebaseio.com",

  projectId: "interface-6d928",

  storageBucket: "interface-6d928.appspot.com",

  messagingSenderId: "825898617196",

  appId: "1:825898617196:web:434cd3b95e4136607a0b49",
};

firebase.initializeApp(firebaseConfig);

var variavel1 = document.getElementById("variavel1");
var temperatura = firebase.database().ref().child("valor");
var frequencia = firebase.database().ref().child("freq");
var variavel2 = document.getElementById("variavel2");

/* Função de geração de númericos pseudo-aleatórios */
function getData() {
  return Math.random();
}
var mudar;
var changeV = () => {
  mudar = document.getElementById("myInput").value;
  frequencia.set(Number(mudar));
};

/* Recebe do firebase os dados do sensor de temperatura */
var temp;
function getTemperatura() {
  temperatura.on("value", function (datasnapshot) {
    var arru1 = datasnapshot.val();
    variavel1.innerText = datasnapshot.val();
    arru1 = Number(arru1);
    temp = arru1;
  });
  frequencia.on("value", function (datasnapshot) {
    variavel2.innerText = datasnapshot.val();
  });
  return temp;
}

/* Cria o gráfico de temperatura */
Plotly.newPlot(
  "temperatura",
  [
    {
      y: [getTemperatura()],
      mode: "lines+markers",
      connectgaps: true,
    },
  ],
  { displayModeBar: true, width: 1800, height: 800 }
);

/* Função de atualização do gráfico de temperatura. Aciona o getTemperatura a cada intervalo de tempo pré-definido */
count = 0;
setInterval(function () {
  Plotly.extendTraces("temperatura", { y: [[getTemperatura()]] }, [0]);
  count++;
  if (count > 1000) {
    Plotly.relayout("temperatura", {
      xaxis: {
        range: [count - 1000, count],
      },
    });
  }
}, 15);
