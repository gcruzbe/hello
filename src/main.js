const buttonId = document.querySelector('#buttonId');
let inputIdValue = document.querySelector('#inputId');
let params = {id:inputIdValue.value};

const formIdContainer = document.querySelector('#formIdContainer');
const formUserContainer = document.querySelector('#formUserContainer');
const errorGetContainer = document.querySelector('#errorGet');
const errorPostContainer = document.querySelector('#errorPost');
const successPostContainer = document.querySelector('#successPost');

const buttonSend = formUserContainer.querySelector('#buttonSend');
const buttonBackForm = errorPostContainer.querySelector('#backForm');

const nameUser = formUserContainer.querySelector('#nameUser');
const surnameUser = formUserContainer.querySelector('#surnameUser');
const emailUser = formUserContainer.querySelector('#email');
const phoneUser = formUserContainer.querySelector('#phone');
const ageUser = formUserContainer.querySelector('#age');
const loan = formUserContainer.querySelector('#loan');
const loanDate = formUserContainer.querySelector('#loanDate');
const loanWeeks = formUserContainer.querySelector('#loanWeeks');

const errorGetText = errorGetContainer.querySelector('#errorGetText');
const errorPostText = errorPostContainer.querySelector('#errorPostText');
const successPostText = successPostContainer.querySelector('#successPostText');

/** Manejador de fechas para dar el formato YYYY-MM-DD */
const handleDate = () => {
  let date = new Date();
  let month;
  if(date.getMonth()+1 < 10) {
    month = `0${date.getMonth()+1}`;
  }
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
}

loanDate.setAttribute('min', `${handleDate()}`);

/** Al hacer click en el botón se hace la llamada a la url para rellenar los datos en los inputs
 * Se muestran y se ocultan los divs en función del estado de la respuesta
*/
buttonId.addEventListener('click', () => {
    fetch(`https://api7.cloudframework.io/recruitment/fullstack/users?id=${inputIdValue.value}`, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res=> {
      console.log(res);
      if(res.status === 200) {
        formUserContainer.removeAttribute('hidden');
        formIdContainer.setAttribute('hidden', 'hidden');
        nameUser.value = res.data.name;
        surnameUser.value = res.data.surname;
        emailUser.value = res.data.email;
        phoneUser.value = res.data.phone;
        ageUser.value = res.data.age;
      } else {
        errorGetContainer.removeAttribute('hidden');
        errorText.innerHTML = res.message;
      }
    })
    .catch(error => {
      console.log(error);
    })
});

/** Al hacer click en el botón se envia el formulario con los datos correspondientes
 * Se muestran y se ocultan los divs en función del contenido de los inputs
*/
buttonSend.addEventListener('click', () => {
  const data = new FormData(formUserContainer.querySelector('#form'));
  fetch(`https://api7.cloudframework.io/recruitment/fullstack/users/${inputIdValue.value}`, {
      method: 'POST',
      body: data
  })
  .then(res => res.json())
  .then(res=> {
    console.log(res);
    if(res.status === 200) {
      formUserContainer.setAttribute('hidden', 'hidden');
      successPostContainer.removeAttribute('hidden');
      successPostText.innerHTML = res.data;
    } else {
      formUserContainer.setAttribute('hidden', 'hidden');
      errorPostContainer.removeAttribute('hidden');
      errorPostText.innerHTML = res.message;
    }
  })
  .catch(error => {
    console.log(error);
  })
});

/** Botón de retorno que aparece en el error para mostrar el formulario de nuevo
*/
buttonBackForm.addEventListener('click', () => {
  errorPostContainer.setAttribute('hidden', 'hidden');
  formUserContainer.removeAttribute('hidden');
});