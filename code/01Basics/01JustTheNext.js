let main = document.querySelector("#main");

function writeToBody(message) {

    main.innerHTML += (message + `<br />`);
}

// Observable
const observable = (observer) => {

    let i = 0;

    // Producer
    var intervalId = setInterval(() => {

        observer.next(i);
        i++;
    }, 100);    
}

// Observer
let observer = {

    next: (i) => { writeToBody(`interval ${i}`) }
}

// Subscribe
observable(observer);
