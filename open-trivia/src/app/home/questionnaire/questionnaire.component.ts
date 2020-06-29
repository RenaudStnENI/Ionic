import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {

    @Input() pseudo: string;
    responses: string[];
    reponse: string;

    constructor() {
    }


    ngOnInit() {
        this.responses = ['reponse 1', 'reponse 2', 'reponse 3', 'reponse 4'];
    }


    ValidateResponse() {
        console.log("reponse : ", this.reponse)
    }

    respond(reponse: string) {
        this.reponse = reponse;
        console.log("reponse : ", this.reponse);
    }
}
