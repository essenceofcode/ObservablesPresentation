import {writeToBody} from './WriteToBody.js';

// Observable
const observable = (observer) => {

    let i = 0;

    // Producer
    var intervalId = setInterval(() => {

        observer.next(i);
        
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

// Observer
let observer = {

    next: (i) => { writeToBody(`interval ${i}`) },
    error: (err) => { writeToBody(`error: ${err}`); },
    complete: () => { writeToBody(`I finished!`)}
}

// Operator
let filter = (callback, observable) => {
    return function (observer) {
        return observable({
            next(value) { if (callback(value)) observer.next(value); },
            error(error) { observer.error(error); },
            complete() { observer.complete(); }
        })
    }
}

let filteredObservable = filter((val) => !!(val % 2), observable);

// Subscribe
let teardown = filteredObservable(observer);

setTimeout(teardown, 20000);
