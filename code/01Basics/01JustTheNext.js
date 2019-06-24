import {writeToBody} from './WriteToBody.js';

const observer = {
    next: i => writeToBody(`interval ${i}`),
    error: err => writeToBody(`error: ${err}` ),
    complete: msg => writeToBody(`Completed`)
}

const observable = observer => {

    let i = 0;

    let intervalId = setInterval(() => {

        observer.next(i);
        i++;
    }, 1000);    
}

observable(observer);
