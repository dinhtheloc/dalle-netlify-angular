import { Directive, ElementRef, HostBinding, Input } from '@angular/core'

@Directive({
    selector: 'img[lazyLoadingImg]',
    standalone: true,
})
export class LazyImgDirective {
    @HostBinding('attr.src') srcAttr = ''
    @Input() src: string = ''

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage()
    }

    private canLazyLoad() {
        return window && 'IntersectionObserver' in window
    }

    private lazyLoadImage() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(({ isIntersecting, target }) => {
                if (isIntersecting) {
                    // this.loadImage(target)
                    const lazyImage = target as HTMLImageElement
                    const src = lazyImage.dataset['src'] || ''

                    lazyImage.tagName.toLowerCase() === 'img'
                        ? (lazyImage.src = src)
                        : (lazyImage.style.backgroundImage =
                              "url('" + src + "')")

                    obs.unobserve(this.el.nativeElement)

                    lazyImage.removeAttribute('lazy')
                }
            })
        })
        obs.observe(this.el.nativeElement)

        // this.observer = new IntersectionObserver((entries, imgObserver) => {
        //     entries.forEach((entry) => {
        //         // chưa đến viewport, dừng sớm bớt đau khổ
        //         if (!entry.isIntersecting) {
        //             return
        //         }

        //         // src được lưu trong data-src, chúng ta copy nó vào src là xong.
        //         const lazyImage = entry.target as HTMLImageElement
        //         const src = lazyImage.dataset.src

        //         // safety, doesn't have data-src attribute, stop
        //         if (!src) {
        //             return
        //         }

        //         // nếu ảnh là thẻ img, copy vào src
        //         // nếu ảnh là background image, copy vào background-image
        //         lazyImage.tagName.toLowerCase() === 'img'
        //             ? (lazyImage.src = src)
        //             : (lazyImage.style.backgroundImage = "url('" + src + "')")

        //         // xong việc thì nên dọn dẹp
        //         lazyImage.removeAttribute('lazy')

        //         // tiếp tục dọn dẹp
        //         imgObserver.unobserve(lazyImage)
        //     })
        // })
    }

    private loadImage() {
        this.srcAttr = this.src
    }
}
