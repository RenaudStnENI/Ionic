import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Answer} from "../models/answer";
import {Question} from "../models/question";
import {OpenTriviaServiceService} from "../Services/open-trivia-service.service";
import {ToastController} from "@ionic/angular";

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

    pseudo: string;
    difficulty: string;

    @Output() form_validated = new EventEmitter<any>();

    count: number = 1;


    questionsArray: unknown = [];
    questionCourante: Question;
    propositions: Answer[] = [];

    displayButton: boolean;
    numeroQuestion: number = 0;
    next: boolean;
    score: number = 0;
    end_bool: boolean = false;
    theEnd: boolean;


    constructor(
        private route: ActivatedRoute,
        private service: OpenTriviaServiceService,
        public toastController: ToastController
    ) {
        this.route.params.subscribe((params) => {
            this.pseudo = params['pseudo'];
            this.difficulty = params['difficulty'];
        });
    }

    ngOnInit() {
        this.getQuestions().then(result => {
            this.questionCourante = this.questionsArray[this.numeroQuestion];
            for (let reponse of this.questionCourante.incorrect_answers) {
                this.propositions.push(new Answer(reponse, false));
            }
            this.propositions.push(new Answer(this.questionCourante.correct_answer, true))
            this.shuffleArray(this.propositions);
        });


    }

    async getQuestions() {
        this.questionsArray = await this.service.getQuestions(this.difficulty, this.count);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    ValidateResponse() {

        if (this.numeroQuestion < this.count) {
            this.numeroQuestion++;
            this.questionCourante = this.questionsArray[this.numeroQuestion];
            this.propositions = [];
            for (let reponse of this.questionCourante.incorrect_answers) {
                this.propositions.push(new Answer(reponse, false));
            }
            this.propositions.push(new Answer(this.questionCourante.correct_answer, true))
            this.shuffleArray(this.propositions);
        }

        this.next = false;
    }

    respond(response: Answer) {
        this.displayButton = true;

        if (response.correct && !this.next) {
            this.score++;
            this.presentToast(true)
        } else {
            this.presentToast(false);
        }

        if (this.numeroQuestion == this.count - 1) {
            this.end_bool = true;
        }
        this.next = true;
    }

    async presentToast(reponseBool: boolean) {
        if (reponseBool == true) {
            const toast = await this.toastController.create({
                message: 'Bonne réponse !!',
                duration: 1000
            });
            toast.present();

        } else {
            const toast = await this.toastController.create({
                message: 'Mauvaise réponse :(',
                duration: 1000
            });
            toast.present();
        }

    }

    ShowScore() {
        this.theEnd = true;
    }

    recommencer() {
        this.theEnd = false;
        this.end_bool = false;
        this.next = false;
        this.questionsArray = [];
        this.questionCourante = null;
        this.form_validated.emit();
        this.score = 0;
    }

}
