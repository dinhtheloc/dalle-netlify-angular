import { Component, Input } from '@angular/core'
import * as FileSaver from 'file-saver'
import { LazyImgDirective } from 'src/app/directives/lazy-img.directive'
import { Post } from 'src/app/interfaces/post'

@Component({
    standalone: true,
    selector: 'home-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: [LazyImgDirective]
})
export class CardComponent {
    @Input() post!: Post

    downloadImage(_id: string, photo: Blob | string) {
        FileSaver.saveAs(photo, `download-${_id}.jpg`)
    }
}
