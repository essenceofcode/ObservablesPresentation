import {writeToBody} from './WriteToBody.js';

// Observable
const observable = observer => {

    let i = 0;

    var intervalId = setInterval(() => {

        observer.next(i);
        i++;
    }, 1000);    
}

// Observer
let observer = {

    next: i => { writeToBody(`interval ${i}`) }
}

// Subscribe
observable(observer);

// Operator