import {writeToBody} from './WriteToBody.js';

// Producer
const producer = (observer) => {
    
    let i = 0;

    let intervalId = setInterval(() => {
        observer.next(i);        
        i++
    }, 1000);

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

    filter(callback) {
        let currentProducer = this.producer;

        this.producer = (observer) => {
            return currentProducer({
                next(value) { if (callback(value)) observer.next(value); },
                error(error) { observer.error(error); },
                complete() { observer.complete(); }
            })
        }

        return this;
    }
}

// Observer
let observer = {

    next: (i) => { writeToBody(`interval ${i}`) },
    error: (err) => { writeToBody(`error: ${err}`); },
    complete: () => { writeToBody(`I finished!`)}
}

// Subscribe
var observable = new Observable(producer)
    .filter((val) => val % 2)
    .filter((val) => val !== 3);

let teardown = observable.subscribe(observer);

setTimeout(teardown, 20000);