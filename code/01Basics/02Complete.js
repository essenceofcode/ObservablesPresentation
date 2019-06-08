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

        if (i === 30) {
            observer.complete();
            clearInterval(intervalId);            
        } 
        
        i++;
    }, 100)
}

// Observer
let observer = {

    next: (i) => { writeToBody(`interval ${i}`) },
    complete: () => { writeToBody(`I'm Complete!`)}
}

// Subscribe
observable(observer);
