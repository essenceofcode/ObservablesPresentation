let main = document.querySelector("#main");
let spinner:any = document.querySelector("#spinner");

export function writeToBody(message: string) {

    main.innerHTML += (message);
}

export function clearBody(){
    main.innerHTML = '';
}

export function enableSpinner(){
    spinner.style.visibility = '';
}

export function disableSpinner(){
    spinner.style.visibility = 'hidden';
}