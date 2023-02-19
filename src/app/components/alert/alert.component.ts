import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

interface IAlert {
    id: number
    text: string
}

@Component({
    standalone: true,
    selector: 'alert',
    templateUrl: './alert.component.html',
    imports: [CommonModule],
})
export class AlertComponent {
    alerts: IAlert[] = []
    count = 0

    addItem(text: string) {
        this.count++

        const alert: IAlert = {
            id: this.count,
            text,
        }

        this.alerts.push(alert)

        setTimeout(() => this.removeItem(alert.id), 3000)
    }

    removeItem(id: number) {
        const objWithIdIndex = this.alerts.findIndex(
            (obj: IAlert) => obj.id === id
        )

        if (objWithIdIndex > -1) {
            this.alerts.splice(objWithIdIndex, 1)
        }
    }
}
