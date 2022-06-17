import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
 import pdfMake from "pdfmake/build/pdfmake";
import { EmployeServiceService } from '../Service/conge-service.service';
import { MatDialog } from '@angular/material/dialog';

interface Role {
  value: string;
  viewValue: string;
}


 @Component({
  selector: 'app-ajout-employe',
  templateUrl: './ajout-conge.component.html',
  styleUrls: ['./ajout-conge.component.scss']
})

 
export class AjoutCongeComponent  implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  roles : Role [] = [
    {value: 'M-0', viewValue: 'Maladie'},
    {value: 'V-1', viewValue: 'Vacance'},
    {value: 'A-2', viewValue: 'Absence demi jour'},
    {value: 'A-4', viewValue: 'Congé de maternité'},
    {value: 'A-5', viewValue: 'Congé de paternité'},
  ];

//passage d'une étape à une autre uniquement si l'étape est validée 
passage_etape = false;
categorie_piece: any;
Informations_Generales_Form: FormGroup;
Informations_Banques_Form: FormGroup;
ContactForm: FormGroup;
Recapitulation_Form: FormGroup;


constructor(private http: HttpClient,public dialog: MatDialog, public service: EmployeServiceService, private fb: FormBuilder ,public datepipe: DatePipe) {

  //   formulaire contenant les informations générales d'employé  
  this.Informations_Generales_Form = this.fb.group({
    Nom_Employe: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    Role: ['', Validators.required],
    local:['', Validators.required],
    Date_naissance: ['', [Validators.required]],   
    Type_Piece_Identite: ['', Validators.required],
    N_Piece_Identite: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    Date_Livraison_Identite: [],
    Description: [''],
    Date_embauche: []
    
  });
 
  //   formulaire contenant les informations spécifique d' employe  
  this.Informations_Banques_Form = this.fb.group({
    Image: [''],
    Email: ['', [
      Validators.required,
      Validators.email,
    ]],
    Banque1: ['' ],
    Rib1: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20)]], 
    Adresse: ['', [Validators.required]], 
    Pays: ['', Validators.required],   
    Ville: [''],  
    Tel1: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    Cnss: [''],  
    St_familliale: [''],  
    Enfant_a_charge: [''],  
    N_permis: [''],  
    Date_permis: [''],  
    Categorie_permis:['']
  });
  
  this.Informations_Banques_Form.controls.Rib1.disable();
   
  // formulaire affichant la récapitulation des tous les champs  
  this.Recapitulation_Form = this.fb.group({});
  
  // récupérer la liste des categories employé
  this.service.ListerCategorieEmploye().subscribe((reponse: Response) => {

    //this.roles = reponse;
  });
  
  // récupérer la liste des categories pièce d'identité
  this.service.ListerCategoriePiece().subscribe((reponse: Response) => {

    this.categorie_piece = reponse;
  });


}


//  création d' Employé
creeremploye() {
  const dialogRef = this.dialog.open(ExampleDialog);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

// message d'erreur lorsque le representant saisi ne respecte pas les conditions prédifinis
MessageErreurRepresentant() {
  if (this.Informations_Generales_Form.get('Representant').hasError('required')) {
    return 'Vous devez entrer le representant du Client!';
  }

  if (this.Informations_Generales_Form.get('Representant').hasError('minlength')) {
    return 'Representant non valide! (Min 3 caractères)';
  }
  if (this.Informations_Generales_Form.get('Representant').hasError('maxlength')) {
    return 'Representant non valide! (Max 30 caractères)';
  }
}
// message d'erreur lorsque Categorie Client saisi ne respecte pas les conditions prédifinis
MessageErreurrole() {
  if (this.Informations_Generales_Form.get('Role').hasError('required')) {
    return 'Vous devez entrer choisir le type !';
  }
}


ngOnInit(): void {
}

 
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class ExampleDialog {}