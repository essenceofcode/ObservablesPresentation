import {writeToBody} from './WriteToBody.js';

// Observable
const observable = (observer) => {

    let i = 0;

    // Producer
    var intervalId = setInterval(() => {

        observer.next(i);

        if (i === 10) {
            observer.complete();
            clearInterval(intervalId);            
        } 
        
        i++;
    }, 1000)
}

// Observer
let observer = {

    next: (i) => { writeToBody(`interval ${i}`) },
    complete: () => { writeToBody(`I'm Complete!`)}
}

// Subscribe
observable(observer);
