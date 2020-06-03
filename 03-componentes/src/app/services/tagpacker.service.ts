import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Componente} from '../interfaces/interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const apiKey = environment.tagPackerApi;
const user = environment.tagPackerUser;
const url = environment.tagPackerUrl;

const headers = new HttpHeaders({
    api_key: apiKey
});

@Injectable({
    providedIn: 'root'
})
export class TagpackerService {

    constructor(private http: HttpClient) {
    }

    getLocalTagList() {
        return this.http.get<string[]>('/assets/data/tags.json');
    }

    loadTagIntoPortal(tag: string) {
        return this.http.post<Observable<any>>(`${url}${user}/tags`, {name: tag}, {headers});
    }
}
