import {Component} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    pseudo: string;
    save_infos: boolean;
    form_validated: boolean;

    constructor() {
        console.log(this.pseudo);
    }

    checkForm() {
        this.form_validated = (!!this.pseudo && this.pseudo.length > 2 && !!this.save_infos);
        console.log("this.form_validated : ", this.form_validated)
    }
}
