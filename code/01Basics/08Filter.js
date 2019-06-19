import {writeToBody} from './WriteToBody.js';

class Observable {

    constructor() {
        
        this.producer = (observer) => {
    
            let i = 0;
        
            this.intervalId = setInterval(() => observer.next(i++), 1000);
        };

        this.teardown = () => {             
            clearInterval(this.intervalId); 
            writeToBody('Teardown Complete');
        }
    }

    subscribe = (observer) => {     
        this.producer(observer);

        return this;
    }

    unsubscribe = () => {
        this.teardown();
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

const myObservable = new Observable()
    .filter(val => !(val % 2))
    .filter(val => (val !== 4))
    .subscribe({

        next: (i) => { writeToBody(`interval ${i}`) },
        error: (err) => { writeToBody(`error: ${err}`); },
        complete: () => { writeToBody(`I finished!`)}
    });

setTimeout(myObservable.unsubscribe, 10000);
