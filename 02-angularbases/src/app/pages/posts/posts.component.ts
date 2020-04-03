import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  mensajes: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.mensajes = this.dataService.getPosts()
      .pipe(
        tap(posts => {
          console.log('Post', posts);
        })
      );
    // .subscribe((posts: any[]) => {
    //  console.log('Posts ', posts);
    //  this.mensajes = posts;
    // });
  }

  escuchaClick(id: number) {
    console.log('click en ', id);
  }

}
