
// const formLogin = document.querySelector('.u-clearfix u-form-spacing-10 u-form-vertical u-inner-form')

const usu = document.getElementById('name-3b9a').value;
const contra = document.getElementById('email-3b9a').value;

// formLogin.addEventListener('submit', e => {
//     e.preventDefault()
//     const data = Object.fromEntries(new FormData(e.target))
//     signInWithEmailAndPassword(auth, data.email, data.password)
//         .then(credential => {
//            window.location.href = '/PUBLICO/Principal_Publico.html'
//         })
//         .catch(err => {
//             console.log('Error login', err)
//             errorLogin.innerHTML = err.code
//         })
// })

document.getElementById("btn_iniciarsesion").addEventListener("click", iniciarSesion);

function iniciarSesion(){
    if (usu == "admin" || contra == "12345"){
        window.location.href = '/usuarios/Principal_usuario.html'
        
    }else{
        // errorLogin.innerHTML = err.code
        console.log(usu.outerText.toString)
        // console.log("sign out")
    }
}