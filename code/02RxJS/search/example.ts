import { fromEvent } from 'rxjs';
import { writeToBody, clearBody } from './WriteToBody';
import { pluck, switchMap, flatMap, filter, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

let $images = fromEvent(document.querySelector('#text-input'), 'keyup')
    .pipe(
        debounceTime(500),
        pluck('target','value'),
        filter((searchText: string) => searchText.length > 3),        
        distinctUntilChanged(),
        switchMap(text => fromFetch(`https://images-api.nasa.gov/search?q=${text}`)),
        tap(() => clearBody()),
        filter(response => response.status === 200),
        switchMap(response => response.json()),
        flatMap(json => json.collection.items),
        flatMap((items:any) => items.links), 
        filter((link:any) => (link.render === 'image')),
        pluck('href'))
    .subscribe((val:any) => {        
        
        writeToBody(`<img src='${val}' height='150px' width='150px' style='margin:15px'>`);
    });
