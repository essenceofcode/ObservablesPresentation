import {writeToBody} from './WriteToBody.js';

const observer = {

    next: (i) => { writeToBody(`interval ${i}`) },
    complete: () => { writeToBody(`I'm Complete!`)}
}

const observable = (observer) => {

    let i = 0;

    var intervalId = setInterval(() => {

        observer.next(i);

        if (i === 10) {
            observer.complete();
            clearInterval(intervalId);            
        } 
        
        i++;
    }, 1000)
}

observable(observer);
