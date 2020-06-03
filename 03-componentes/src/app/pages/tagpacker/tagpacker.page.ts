import {Component, OnInit} from '@angular/core';
import {TagpackerService} from '../../services/tagpacker.service';

@Component({
    selector: 'app-tagpacker',
    templateUrl: './tagpacker.page.html',
    styleUrls: ['./tagpacker.page.scss'],
})
export class TagpackerPage implements OnInit {

    tags: string[] = [];

    constructor(private tagpackerSrv: TagpackerService) {
    }

    ngOnInit() {
        this.tagpackerSrv.getLocalTagList().subscribe(ts => {
            this.tags = ts;
        });
    }

    async cargarTags() {

        for (const tag of this.tags) {
            console.log('Loading tag ', tag);
            let result;
            await this.tagpackerSrv.loadTagIntoPortal(tag)
                .subscribe(r => result = r);
            console.log('Result ', result);
            await this.delay(3000);

            return;
        }
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
