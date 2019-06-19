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
}

const myObservable = new Observable().subscribe({

    next: (i) => { writeToBody(`interval ${i}`) },
    error: (err) => { writeToBody(`error: ${err}`); },
    complete: () => { writeToBody(`I finished!`)}
});

setTimeout(myObservable.unsubscribe, 10000);
