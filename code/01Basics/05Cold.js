import { writeToId} from './WriteToBody.js';

const observable = (id, observer) => {
    let i = 0;
    
    const intervalId = setInterval(() => { 

        observer.next(`${name}: ${i++}`);
    }, 1000);    

    return () => {
        clearInterval(intervalId);
        writeToId(id, 'Teardown complete!')
    }
}

// every time someone subscribes to a cold observable, the same
// set of values are reproduced
// Cold observables are also unicast (one observer).
const teardownOne = observable('#observer-one', {
    next: i => writeToId('#observer-one', `interval ${i}`),
    error: err => writeToId('#observer-one', `error: ${err}` ),
    complete: msg => writeToId('#observer-one', `Completed`)
});

setTimeout(teardownOne, 15000)

setTimeout(() => {
    const teardownTwo = observable('#observer-two', {
        next: i => writeToId('#observer-two', `interval ${i}`),
        error: err => writeToId('#observer-two',`error: ${err}` ),
        complete: msg => writeToId('#observer-two',`Completed`)
    });
    setTimeout(teardownTwo, 15000)
}, 5000)
