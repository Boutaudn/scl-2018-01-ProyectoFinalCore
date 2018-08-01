// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Agregar visitante
function guardar() {
  let nombre = document.getElementById('nombre').value;
  let d = new Date();
  let time = d.getHours() + ":" + d.getMinutes();
  let date = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
  let mail = document.getElementById('email').value;
  let ocupacion = document.getElementById('ocupacion').value;
  let destino = document.getElementById('destino').value;
  let rut = document.getElementById('rut').value;
  let patente = document.getElementById('patente').value;
  //let img = document.getElementById('photo');

  db.collection("visitors").add({
    email: mail,
    first: nombre,
    date: date,
    time: time,
    rut: rut,
    ocupacion: ocupacion,
    patente: patente,
    destino: destino
    //foto: img
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      alert('Has sido registrado');
      document.getElementById('nombre').value = '';
      document.getElementById('rut').value = '';
      document.getElementById('email').value = '';
      document.getElementById('ocupacion').value = '';
      document.getElementById('patente').value = '';
      document.getElementById('photo').value = '';
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

// Imprimir visitantes
const tabla = document.getElementById('tabla');
const tablaAdm = document.getElementById('tablaGrande');

db.collection("visitors").onSnapshot((querySnapshot) => {
  // tablaAdm.innerHTML = '';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      tablaAdm.innerHTML += `
        <tr>
          <th scope="row">${doc.data().date}</th>
          <td>${doc.data().time}</td>
          <td>${doc.data().first}</td>
          <td>${doc.data().rut}</td>
          <td>${doc.data().email}</td>
          <td>${doc.data().ocupacion}</td>
          <td>${doc.data().destino}</td>
          <td>${doc.data().patente}</td>
          <td></td>
        </tr>`
    });
});

db.collection("visitors").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      tabla.innerHTML += `
      <tr>
          <th scope="row">${doc.data().time}</th>
          <td></td>
          <td>${doc.data().first}</td>
          <td>${doc.data().destino}</td>
        </tr>`
    });
});



//botones 
const btnregistro = document.getElementById('btnRegistry').addEventListener('click', ()=>{
  primera.classList.remove('divDisplayBlock');
  primera.classList.add('divDisplayNone');
  login.classList.remove('divDisplayNone');
  login.classList.add('divDisplayBlock');
})

const btnAdmi = document.getElementById('btn1').addEventListener('click', ()=>{
  primera.classList.remove('divDisplayBlock');
  primera.classList.add('divDisplayNone');
  administracion.classList.remove('divDisplayNone');
  administracion.classList.add('divDisplayBlock');
})

const btnOk = document.getElementById('boton').addEventListener('click', ()=>{
  login.classList.remove('divDisplayBlock');
  login.classList.add('divDisplayNone');
  primera.classList.remove('divDisplayNone');
  primera.classList.add('divDisplayBlock');
})



/*//crear registro para admi
const btnIniciar = document.getElementById('boton').addEventListener('click', () => {

  let emailRegistry = registryEmail.value;
  let passwordRegistry = registryPassword.value;
  console.log(emailRegistry);
  console.log(passwordRegistry);
  firebase.auth().createUserWithEmailAndPassword(emailRegistry, passwordRegistry)
    .then(() => {
      console.log(emailRegistry);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

})

//Iniciar seción usuario registrado
const btnSingIn = document.getElementById('btnsingin').addEventListener('click', () => {
  let validarMail = registryEmail.value;
  let valiarPassword = registryPassword.value;
  if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(validarMail)) {
    firebase.auth().signInWithEmailAndPassword(validarMail, valiarPassword)
      .then(() => {
        console.log("usuarioExistente");
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    alert("correcto");
  } else {
    alert("incorrecto");
  }
  console.log(validarMail);
  console.log(valiarPassword);
})

*/

