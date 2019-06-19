import { fromEvent, pipe } from 'rxjs';
import { map, switchMap, flatMap, tap, filter, pluck, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { writeToBody, clearBody, enableSpinner, disableSpinner } from './WriteToBody';


const processInput = pipe(    
    pluck('target', 'value'),
    filter((searchText: string) => searchText.length > 3),
    debounceTime(500),
    distinctUntilChanged(),
);

let $images = fromEvent(document.querySelector('#text-input'), 'keyup')
    .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        filter((searchText: string) => searchText.length > 3),        
        distinctUntilChanged(),
        tap(val => { enableSpinner(); }),
        switchMap(text => fromFetch(`https://images-api.nasa.gov/search?q=${text}`)),    
        tap(() => clearBody()),
        tap(() => disableSpinner() ),
        filter(response => response.status === 200),
        switchMap(response => response.json()),
        tap(collection => {
            if (collection.collection.metadata.total_hits === 0) writeToBody('No results');
        }),
        flatMap(json => json.collection.items),   
        flatMap(items => items.links), 
        filter(link => (link.render === 'image')),
        pluck('href'))
    .subscribe(val => {        
        
        writeToBody(`<img src='${val}' height='150px' width='150px' style='margin:15px'>`);
    });


