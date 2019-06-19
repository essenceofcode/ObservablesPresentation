import {writeToBody} from './WriteToBody.js';

const observer = {
    next: i => writeToBody(`interval ${i}`),
    error: err => writeToBody(`error: ${err}` ),
    complete: msg => writeToBody(`Completed`)
}

const observable = observer => {

    let i = 0;

    // We're going to simulate an asynchronous collection of events 
    // arriving over time.
    let intervalId = setInterval(() => {

        observer.next(i);
        i++;
    }, 1000);    
}

// Subscribing separates the creation of the observer 
// from producing values.  In this way observables are lazy.
observable(observer);

// Now you can see we have a problem...  this stream never ends!