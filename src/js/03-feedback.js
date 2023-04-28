import throttle from 'lodash.throttle';

const KEY_FOR_STORE = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
// const textArea = document.querySelector('textarea');

const data = {};

readDataFromLocalStorage();

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onInputForm, 500));

//================================================
function onInputForm(event) {
    data[event.target.name] = event.target.value;
    localStorage.setItem(KEY_FOR_STORE, JSON.stringify(data));
}

function onSubmitForm(event) {
    event.preventDefault();
    
    const myInputElement = document.getElementsByName('email')[0].value;
    const myMessageElement = document.getElementsByName('message')[0].value;
    if (!myInputElement || !myMessageElement) {
         alert('Please enter your email address and message !');
         return false;
    }

    console.log(data);

    form.reset();
    localStorage.removeItem(KEY_FOR_STORE);
}

function readDataFromLocalStorage() {

    let playerSettings = null;
    const dataStr = localStorage.getItem(KEY_FOR_STORE);

    if (dataStr) {

        try {
            playerSettings = JSON.parse(dataStr);
        } catch (error) {
            console.error("Set state error: ", error.message);
            return;
        }

        for (let el in playerSettings) {
            const myInputElement = document.getElementsByName(el)[0];
            myInputElement.value = playerSettings[el];
            data[el] = playerSettings[el];
        }
    }
}