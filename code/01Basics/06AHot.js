import { writeToId } from './WriteToBody.js';

let i = 0;

const observable = (id, observer) => {
    
    const intervalId = setInterval(() => { 

        observer.next(`${name}: ${i++}`);
    }, 1000);    

    return () => {
        clearInterval(intervalId);
        writeToId(id, 'Teardown complete!')
    }
}

// For hot observables the producer of the values is outside
// of the function scope of the observable, so all observables
// share the values being produced.  If you come in during the
// middle of the observable producing values you only get 
// values from that point forward.  Instead of them starting
// over every time.
const teardownOne = observable('#observer-one', {
    next: i => writeToId('#observer-one', `interval ${i}`),
    error: err => writeToId('#observer-one', `error: ${err}` ),
    complete: msg => writeToId('#observer-one', `Completed`)
});

setTimeout(teardownOne, 15000)

setTimeout(() => {
    const teardownTwo = observable('#observer-two', {
        next: i => writeToId('#observer-two', `interval ${i}`),
        error: err => writeToId('#observer-two', `error: ${err}` ),
        complete: msg => writeToId('#observer-two', `Completed`)
    });
    setTimeout(teardownTwo, 15000)
}, 5000)
