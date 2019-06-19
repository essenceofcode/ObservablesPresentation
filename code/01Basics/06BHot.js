import { writeToId, writeToBody } from './WriteToBody.js';

let i = 0;
let observers = [];

const observable = id => {
    
    const intervalId = setInterval(() => { 

        observers.forEach((observer) => {
            observer.next(`${i}`);
        });
        
        i++;

    }, 1000);    

    return () => {
        clearInterval(intervalId);
        writeToBody('Teardown complete!')
    }
}

// Hot observables are also multi-cast.  That is they push
// the same set of values to all observables.
// These is not the same syntax that is used in a real libary
// like RxJS.  This would happen on multiple calls to subscriber.
observers.push({
    next: i => writeToId('#observer-one', `interval ${i}`),
    error: err => writeToId('#observer-one', `error: ${err}` ),
    complete: msg => writeToId('#observer-one', `Completed`)
});

const teardown = observable()
setTimeout(teardown, 15000)

setTimeout(() => {
    observers.push({
        next: i => writeToId('#observer-two', `interval ${i}`),
        error: err => writeToId('#observer-two', `error: ${err}` ),
        complete: msg => writeToId('#observer-two', `Completed`)
    });
}, 5000)
