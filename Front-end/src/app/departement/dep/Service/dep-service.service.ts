import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepServiceService {

  constructor(private http: HttpClient) { }
  

  filtre_6champs (champ1 : any, valeur1 : any, champ2 : any, valeur2 : any, champ3 : any, valeur3 : any ,champ4 : any, valeur4 : any, champ5 : any, valeur5 : any, champ6 : any, valeur6 : any  )
    {
      return this.http.get( 'Filtre_employee_6_Champs', {
        params: {
          Champ1: champ1,
          Valeur1: valeur1,
          Champ2: champ2,
          Valeur2: valeur2,
          Champ3: champ3,
          Valeur3: valeur3,
          Champ4: champ4,
          Valeur4: valeur4,
          Champ5: champ5,
          Valeur5: valeur5,
          Champ6: champ6,
          Valeur6: valeur6,
           
          
        }, observe: 'body'
      }).pipe()
    }
   
  private gererErreur(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur s' + "'" + 'est produite:', error.error.message);
    } else {
      console.error(
        `Code renvoyé par le backend ${error.status}, ` +
        `le contenu était: ${error.error}`);
    }
    return throwError(
      'Veuillez réessayer plus tard.');
  }

  // récupérer image du Client
  Image_Employe(id) {
    return this.http.get('Image_Employee', {
      params: {
        Id: id
      }, responseType: 'blob'
    });
  }
  // Obtenir la liste des champs du fiche Employes
  obtenirListeChampsClient(): Observable<any> {
    return this.http.get( 'Liste_Champs_Employee', { observe: 'body' }).pipe(catchError(this.gererErreur)
    );
  }

 /* connexion(login:any , pwd :any)
  {
    return this.http.get( + 'Connexion/', {
      params: {
        Login: login,
        Pwd: pwd
      }, observe: 'body'
    }).pipe(catchError(this.gererErreur))
  }
*/
  // Filtrer liste du Employes
  filtrerEmployes(champ: any, valeur: any): Observable<any> {

    return this.http.get('Filtre_Employee/', {
      params: {
        Champ: champ,
        Valeur: valeur
      }, observe: 'body'
    }).pipe(catchError(this.gererErreur))

  }
  // récupérer la region  
  ListerRegion(ville): Observable<any> {
    return this.http.get( 'Categorie_Region', {
      params: {
        Ville: ville
      }, observe: 'body'
    }).pipe(catchError(this.gererErreur)
    );
  }
  // récupérer la ville   
  ListerVille(pays): Observable<any> {
    return this.http.get( 'Categorie_Ville', {
      params: {
        Pays: pays
      }, observe: 'body'
    }).pipe(catchError(this.gererErreur)
    );
  }
  // récupérer les pays 
  ListerPays(): Observable<any> {
    return this.http.get( 'Categorie_Pays', { observe: 'body' }).pipe(catchError(this.gererErreur)
    );
  }
  // récupérer les catégories banques  
  ListerBanques(): Observable<any> {
    return this.http.get( 'Categorie_Banque', { observe: 'body' }).pipe(catchError(this.gererErreur)
    );
  }
  // récupérer les catégories  
  ListerCategorieEmploye(): Observable<any> {
    return this.http.get( 'Categorie_Employe', { observe: 'body' }).pipe(catchError(this.gererErreur)
    );
  }
  
  // récupérer les categories de pièce d'identité du Client 
  ListerCategoriePiece(): Observable<any> {
    return this.http.get( 'Categorie_Piece', { observe: 'body' }).pipe(catchError(this.gererErreur)
    );
  }
  // récupérer la liste des Employes
  ListeEmployes(): Observable<any> {
    return this.http.get( 'Employees')
      .pipe(catchError(this.gererErreur)
      );
  }
  //  récupérer le Client selon son identifient
  Employe(id): Observable<any> {   
   
    return this.http.get( 'Employee', {
      params: {
        Id: id
      }, observe: 'body'
    }).pipe(catchError(this.gererErreur)
    );
  }
  // ajouter un Client 
  ajouterEmployes(Client) {

    return this.http.post('Creer_Employee', Client, { observe: "response" })
  }

  // suppression d'un employé par identifiant 
  SupprimerEmployes(formData) {

    return this.http.delete('Supprimer_Employee/', {
      params: {
        Id: formData
      }, observe: 'response'
    }).toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
  }

  // modification d'un employé par id
  ModifierEmployes(data: any): Observable<any> {
    console.log(data)
    return this.http.post( 'Modifier_Employee', data).pipe(
      catchError(this.gererErreur)
    );
  }

    //  get lise des locals 
    locals( ) : Observable<any>{
      return this.http.get('Locals', { observe: 'body' }).pipe(catchError(this.gererErreur)
      );
    }
}
