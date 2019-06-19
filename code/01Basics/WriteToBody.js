let main = document.querySelector("#main");

export function writeToBody(message) {

    main.innerHTML += (message + `<br />`);
}

export function writeToId(id, msg) {

    let region = document.querySelector(id);
    let table = document.querySelector("table");
    table.style.visibility = '';

    region.innerHTML += (msg + '<br />');
}