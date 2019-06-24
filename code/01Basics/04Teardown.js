import {writeToBody} from './WriteToBody.js';


let observer = {

    next: (i) => { writeToBody(`interval ${i}`) },
    error: (err) => { writeToBody(`error: ${err}`); },
    complete: () => { writeToBody(`I finished!`)}
}

const observable = (observer) => {

    let i = 0;

    var intervalId = setInterval(() => {
        if ((i % 2) === 1) {
            observer.next(i);
        } else {
            observer.error(`ERROR: The number ${i} is not odd!`);
        }
        
        if (i === 30) {
            observer.complete();
            clearInterval(intervalId);            
        }    
        
        i++
    }, 1000);

    return () => { 

        clearInterval(intervalId); 
        writeToBody('Teardown Complete');
    }
}


// subscription of an observable usually returns a method that
// can unsubscriber or run a dispose / teardown
// This allows the caller to decide when it's done with the
// observable.
let unsubscribe = observable(observer);

setTimeout(unsubscribe, 20000);


// That's it.  that's the basic building blocks of observables.
