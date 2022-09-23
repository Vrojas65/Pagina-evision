  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
  import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue }  from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBGVn8cr9_Tp0dV0ZFLdyGcIqQuH1yEAso",
    authDomain: "redes-1beae.firebaseapp.com",
    databaseURL: "https://redes-1beae-default-rtdb.firebaseio.com",
    projectId: "redes-1beae",
    storageBucket: "redes-1beae.appspot.com",
    messagingSenderId: "402597026160",
    appId: "1:402597026160:web:93179d6eecb1fc5d9b17b5",
    measurementId: "G-YZBKXZ4KQ4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  

// Conexión Realtime-Database
const databaseRef = getDatabase()
const valvoltaje = document.getElementById('valV')
const valcorriente = document.getElementById('valC')

//Funcion valor en tabla voltaje
let valor;
const referenceValor = query( ref(databaseRef,'Señales/Linea2'), limitToLast(1))
onValue(referenceValor, (data) => {
    
valor=data.val()
let key = Object.keys(valor)[0]
valvoltaje.innerHTML = `${valor[key]} %`
})

//Funcion valor en tabla corriente
let valorc;
const referenceValor1 = query( ref(databaseRef,'Señales/Linea1'), limitToLast(1))
onValue(referenceValor1, (data) => {
    
valor=data.val()
let key = Object.keys(valor)[0]
valcorriente.innerHTML = `${valor[key]} A`
})

//Funcion valores grafica voltaje
let values = []
const referenceValues = query( ref(databaseRef, 'Señales/Linea2'), limitToLast(25) )
onValue(referenceValues, (data) => {
  for (let key in data.val()) {
    values.push(data.val()[key])
  }
  myChart.data.datasets[0].data = values
  myChart.update()
  values= []
  
})
 //Funcion valores grafica corriente
 let values2 = []
 const referenceValues3 = query( ref(databaseRef, 'Señales/Linea1'), limitToLast(25) )
 onValue(referenceValues3, (data) => {
   for (let key in data.val()) {
     values2.push(data.val()[key])
   }
   myChart1.data.datasets[0].data = values2
   myChart1.update()
   values2= []
})
  //Funcion fecha y hora grafica 
    let fechas = []
    let horas = []
    const referenceDateTime = query( ref(databaseRef, 'Señales/Fecha'), limitToLast(25) )
    onValue(referenceDateTime, (data) => {
    for (let key in data.val()) {
        let dateObj = new Date(data.val()[key])
        fechas.push(dateObj.toLocaleDateString())
        horas.push(dateObj.toTimeString().split(' ')[0])
    }
    myChart.data.labels = horas
    myChart.update()
    myChart1.data.labels = horas
    myChart1.update()
    fechas = []
    horas = []
    /*const fechasFiltradas = myDates(fechas)*/
    })
    
//Grafica  
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'THD Corriente',
            data: [],
            backgroundColor: [
                '#f00',
            ],
            borderColor: [
                '#f00',
                
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        },
        responsive: true
    }
});
//Grafica  corriente
const ctx1 = document.getElementById('myChart1').getContext('2d');
const myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Corriente (A)',
            data: [],
            backgroundColor: [
                '#0c8d0a',
            ],
            borderColor: [
                '#0c8d0a',
                
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        },
        responsive: true
    }
});
