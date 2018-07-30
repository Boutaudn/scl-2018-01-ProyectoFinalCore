// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Agregar visitante
function guardar() {
  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let d = new Date();
  let time = d.getHours() + ":" + d.getMinutes();
  let date = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
  let mail = document.getElementById('email').value;
  let ocupacion = document.getElementById('ocupacion').value;
  let destino = document.getElementById('destino').value;
  let rut = document.getElementById('rut').value;

  db.collection("visitors").add({
    email: mail,
    first: nombre,
    last: apellido,
    date: date,
    time: time,
    rut: rut,
    ocupacion: ocupacion,
    destino: destino
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('rut').value = '';
      document.getElementById('email').value = '';
      document.getElementById('ocupacion').value = '';
      // document.getElementById('destino').value = '';
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

// Imprimir visitantes
const tabla = document.getElementById('tabla');

db.collection("visitors").onSnapshot((querySnapshot) => {
  tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      tabla.innerHTML += `
      <tr>
            <th scope="row">${doc.data().time}</th>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().destino}</td>
          </tr>`

    });
});
//crear registro para admi
const btnIniciar = document.getElementById('btnregister').addEventListener('click', () => {

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
