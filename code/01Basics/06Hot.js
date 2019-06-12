import {writeToBody} from './WriteToBody.js';

let i = 0;
i++;
let observers = []

// Observable
const observable = () => {

    // Producer
    var intervalId = setInterval(() => {

        observers.forEach((observer) => {

            if (i > 20) {            
                clearInterval(intervalId);   
                
                observer.complete();
            } else {
    
                observer.next(`${i}`);
            }
            
            i++;
        })
    }, 1000);

    return () => { clearInterval(intervalId); }
}

// Observer
let observer = {

    next: (i) => { writeToBody(`${i}`) },
    error: (err) => { writeToBody(`error: ${err}`); },
    complete: () => { writeToBody(`I finished!`)}
}

// Subscribe
observers.push(observer);


observable();

setTimeout(() => {
    writeToBody('New Observer Starting');
    observers.push(observer)}, 10000);
