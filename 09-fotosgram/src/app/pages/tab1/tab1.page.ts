import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../interfaces/interfaces';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    posts: Post[] = [];

    habilitado = true;

    constructor(private postSrv: PostService) {
    }

    ngOnInit(): void {
        this.siguientes();
    }

    siguientes($event?: any, pull: boolean = false) {

        this.postSrv.getPosts(pull).subscribe((resp) => {
            console.log(resp);
            this.posts.push(...resp.posts);

            if ($event) {
                $event.target.complete();
                if (resp.posts.length === 0) {
                    this.habilitado = false;
                }

            }
        });
    }

    recargar($event) {
        this.habilitado = true;
        this.posts = [];
        this.siguientes($event, true);
    }
}
