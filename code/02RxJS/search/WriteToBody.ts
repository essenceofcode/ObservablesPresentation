let main = document.querySelector("#main");
let spinner = document.querySelector("#spinner");

export function writeToBody(message: string) {

    main.innerHTML += (message);
}

export function clearBody(){
    main.innerHTML = '';
}

export function enableSpinner(){
    spinner = document.querySelector("#spinner");
    spinner.style.visibility = '';

    clearBody();
}

export function disableSpinner(){
    spinner = document.querySelector("#spinner");
    spinner.style.visibility = 'hidden';
}