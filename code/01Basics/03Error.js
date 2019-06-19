import {writeToBody} from './WriteToBody.js';

const observer = {

    next: (i) => { writeToBody(`interval ${i}`) },
    error: (err) => { writeToBody(`error: ${err}`); },
    complete: () => { writeToBody(`I finished!`)}
}

const observable = (observer) => {

    let i = 0;

    var intervalId = setInterval(() => {

        if (i % 2) {
            observer.next(i);
        } else {
            observer.error(`ERROR: The number ${i} is not odd!`);
        }
        
        if (i > 10) {
            observer.complete();
            clearInterval(intervalId);            
        }    
        
        i++;
    }, 1000)
}

observable(observer);
