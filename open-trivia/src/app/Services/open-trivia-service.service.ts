import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class OpenTriviaServiceService {

    constructor(private http: HttpClient) {
    }

    async getQuestions(difficulte: string, nb: number) {
        return new Promise(async (resolve, reject)=>{
            try{
                let params = new HttpParams();
                params = params.append('amount', nb.toString());
                params = params.append('difficulty', difficulte);
                const response = await this.http.get('https://opentdb.com/api.php',{params: params}).toPromise();
                if (!!response && response['results']){
                    resolve(response['results']);
                } else {
                    reject('Impossible de comprendre la réponse du serveur');
                }
            } catch (e) {
                console.log('Impossible de récupérer la recherche', e);
                reject('Impossible de récupérer la recherche')
            }
        })
    }

}
