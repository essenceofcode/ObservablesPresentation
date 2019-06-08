let main = document.querySelector("#main");

function writeToBody(message) {

    main.innerHTML += (message + `<br />`);
}

let i = 0;
i++;

// Observable
const observable = (observers) => {

    let numValues = 0;

    // Producer
    var intervalId = setInterval(() => {

        if (numValues === 10) {            
            clearInterval(intervalId);   
            
            observers.forEach((observer) => {
                observer.complete();
            });
        } 

        observers.forEach((observer) => {
            observer.next(`${i}`);
        });       
       
        i++;
        numValues++;
    }, 100);

    return () => { clearInterval(intervalId); }
}

// Observer
let observer = {

    next: (i) => { writeToBody(`${i}`) },
    error: (err) => { writeToBody(`error: ${err}`); },
    complete: () => { writeToBody(`I finished!`)}
}

// Subscribe
observable([observer, observer, observer, observer, observer]);
