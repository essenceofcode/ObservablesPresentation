let main = document.querySelector("#main");

function writeToBody(message) {

    main.innerHTML += (message + `<br />`);
}

// Observable
const observable = (observer, name) => {

    let i = 0;

    // Producer
    var intervalId = setInterval(() => {

        if (i === 10) {
            observer.complete();
            clearInterval(intervalId);            
        } 

        observer.next(`${name}: ${i}`);
       
        i++;
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
observable(observer, 'first');
observable(observer, 'second');
observable(observer, 'third');
observable(observer, 'fourth');
observable(observer, 'fifth');
