import { fromEvent } from 'rxjs';
import { writeToBody } from './WriteToBody';

let $images = fromEvent(document.querySelector('#text-input'), 'keyup')
    .subscribe((val:any) => {        
        
        writeToBody(val + '<br/>');
    });
