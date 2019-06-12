let main = document.querySelector("#main");

export function writeToBody(message) {

    main.innerHTML += (message + `<br />`);
}
