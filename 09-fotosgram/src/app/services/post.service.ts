import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RespuestaPosts} from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class PostService {

    paginaPosts = 0;

    constructor(private httpClient: HttpClient) {
    }

    getPosts(pull: boolean = false) {
        if(pull){
            this.paginaPosts = 0;
        }
        this.paginaPosts++;
        return this.httpClient.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`, {headers: {'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVlY2U3ZTdhNTM0NTFhZjI0M2VlNmU4ZSIsIm5vbWJyZSI6Imp1YW4ucGVyZXoiLCJlbWFpbCI6Imp1YW4ucGVyZXpAZ21haWwuY29tIiwiYXZhdGFyIjoiYXYtMi5wbmcifSwiaWF0IjoxNTkwNjY2NzIwLCJleHAiOjE1OTMyNTg3MjB9.9fTln6C1L---IPt8Fih-ZAzVzGZBO0KcppKCiU_h13I'}});
    }


}
