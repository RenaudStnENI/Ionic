import {Component, OnInit} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    pseudo: string;
    save_infos: boolean = false;
    form_validated: boolean = false;
    tested: Boolean = false;
    difficulte: string;

    constructor(
        public toastController: ToastController,
        private router: Router
    ) {
    }

    ngOnInit() {
    }


    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Veuillez rentrer un pseudo et une difficulté.',
            duration: 3000
        });
        toast.present();
    }

    checkForm() {
        this.tested = true;
        this.form_validated = (!!this.pseudo && this.pseudo.length > 2 && !!this.difficulte);
        if (!this.form_validated) {
            this.presentToast();
        } else {
            this.router.navigate(['/game', this.pseudo, this.difficulte])
        }
    }
}

