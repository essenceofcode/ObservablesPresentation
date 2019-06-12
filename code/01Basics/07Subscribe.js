import {writeToBody} from './WriteToBody.js';

// Producer
const producer = (observer) => {
    
    let i = 0;

    let intervalId = setInterval(() => {
        if (i % 2) {
            observer.next(i);
        } else {
            observer.error(`ERROR: The number ${i} is not odd!`);
        }
        
        if (i === 30) {
            observer.complete();
            clearInterval(intervalId);            
        }    
        
        i++
    }, 100);

    return () => { 

        clearInterval(intervalId); 
        writeToBody('Teardown Complete');
    }
}

// Observable
class Observable {

    constructor(producer) {
        this.producer = producer;
    }

    subscribe(observer) {     
        return this.producer(observer);
    }
}

// Observer
let observer = {

    next: (i) => { writeToBody(`interval ${i}`) },
    error: (err) => { writeToBody(`error: ${err}`); },
    complete: () => { writeToBody(`I finished!`)}
}

// Setup
let observable = new Observable(producer);

// Subscribe
observable.subscribe(observer);
