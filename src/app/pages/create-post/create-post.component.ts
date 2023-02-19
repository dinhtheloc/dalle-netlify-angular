import { CommonModule } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, ViewChild } from '@angular/core'
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { AlertComponent } from 'src/app/components/alert/alert.component'
import { surpriseMePrompts } from 'src/app/constant'
import { DallEService } from 'src/app/services/dall-e.service'
import { PostService } from 'src/app/services/post.service'

@Component({
    selector: 'create-post',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AlertComponent],
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
    generatingImg = false
    loading = false
    form!: FormGroup

    @ViewChild('AlertComponent') alertComponent!: AlertComponent
    constructor(
        private fb: FormBuilder,
        private postService: PostService,
        private dallEService: DallEService,
        private router: Router
    ) {
        this.form = this.fb.group({
            name: this.fb.control('', Validators.required),
            prompt: this.fb.control('', Validators.required),
            photo: this.fb.control('', Validators.required),
        })
    }

    get name() {
        return this.form.get('name') as FormControl
    }

    get prompt() {
        return this.form.get('prompt') as FormControl
    }

    get photo() {
        return this.form.get('photo') as FormControl
    }

    async handleSubmit() {
        this.loading = true
        try {
            await firstValueFrom(this.postService.createPost(this.form.value))
            alert('Success')
            this.router.navigate(['home'])
        } catch (err) {
            if (err instanceof HttpErrorResponse) {
                this.alertComponent.addItem(err.error.message)
            }
        } finally {
            this.loading = false
        }
    }

    handleSurpriseMe() {
        const randomPrompt = this.getRandomPrompt(this.prompt.value)
        this.prompt.setValue(randomPrompt)
    }

    getRandomPrompt(prompt: string): string {
        const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
        const randomPrompt = surpriseMePrompts[randomIndex]
        if (randomPrompt === prompt) return this.getRandomPrompt(prompt)
        return randomPrompt
    }

    async generateImage() {
        try {
            this.generatingImg = true
            const { photo } = await firstValueFrom(
                this.dallEService.createImage({
                    prompt: this.prompt.value,
                })
            )
            this.photo.setValue(`data:image/jpeg;base64,${photo}`)
        } catch (err: unknown) {
            if (err instanceof HttpErrorResponse) {
                this.alertComponent.addItem(err.error.message)
            }
        } finally {
            this.generatingImg = false
        }
    }
}
