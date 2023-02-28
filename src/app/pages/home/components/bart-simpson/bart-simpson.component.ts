import { Component, HostListener } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'bart-simpson',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './bart-simpson.component.html',
    styleUrls: ['./bart-simpson.component.scss'],
})
export class BartSimpsonComponent {
    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e: any) {
        const mouseX = e.clientX
        const mouseY = e.clientY

        const anchor = document.getElementById('anchor')
        if (anchor) {
            const rekt = anchor.getBoundingClientRect()

            const anchorX = rekt.left + rekt.width / 2
            const anchorY = rekt.top + rekt.height / 2

            const angleDeg = this.angle(mouseX, mouseY, anchorX, anchorY)

            const eyes = Array.from(
                document.getElementsByClassName(
                    'eye'
                ) as HTMLCollectionOf<HTMLElement>
            )

            eyes.forEach((eye) => {
                eye.style.transform = `rotate(${90 + angleDeg}deg)`
            })
        }
    }

    angle(cx: number, cy: number, ex: number, ey: number) {
        const dy = ey - cy
        const dx = ex - cx
        const rad = Math.atan2(dy, dx)
        const deg = (rad * 180) / Math.PI
        return deg
    }
}
