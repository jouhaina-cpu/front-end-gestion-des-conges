import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeServiceService } from '../Service/conge-service.service';
import { MatDialog } from '@angular/material/dialog';


interface Role {
  value: string;
  viewValue: string;
}


 @Component({
  selector: 'app-ajout-employe',
  templateUrl: './modifier-conge.component.html',
  styleUrls: ['./modifier-conge.component.scss']
})

 
export class ModifierCongeComponent  implements OnInit {

  roles : Role [] = [
    {value: 'M-0', viewValue: 'Maladie'},
    {value: 'V-1', viewValue: 'Vacance'},
    {value: 'A-2', viewValue: 'Absence demi jour'},
    {value: 'A-4', viewValue: 'Congé de maternité'},
    {value: 'A-5', viewValue: 'Congé de paternité'},
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
//passage d'une étape à une autre uniquement si l'étape est validée 
passage_etape = false;
pays: string;
ville: string;
region: string;
categorie_region: any;
categorie_piece: any;
Acces: any;
choix_Categorie_Fiscale: any;
Informations_Generales_Form: FormGroup;
Informations_Banques_Form: FormGroup;
ContactForm: FormGroup;
Recapitulation_Form: FormGroup;
modeleSrc: any;
modele: any;
image_par_defaut_blob: any;
imageSrc: any;
date:any;

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
   
  // récupérer la liste des categories banques 
  this.service.ListerBanques().subscribe((reponse: Response) => {

    //this.categorie_banque = reponse;
  });
  // récupérer la liste des pays
  this.service.ListerPays().subscribe((reponse: Response) => {

    //this.categorie_pays = reponse;
  }); 
}

//  création d' Employé
creeremploye(){
  const dialogRef = this.dialog.open(ModifierDialog);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

// message d'erreur lorsque le nom saisi ne respecte pas les conditions prédifinis
MessageErreurNom() {
  if (this.Informations_Generales_Form.get('Nom_Employe').hasError('required')) {
    return 'Vous devez entrer le nom du Employe!';
  }

  if (this.Informations_Generales_Form.get('Nom_Employe').hasError('minlength')) {
    return 'Nom du Client non valide! (Min 3 caractères)';
  }
  if (this.Informations_Generales_Form.get('Nom_Employe').hasError('maxlength')) {
    return 'Nom du Client non valide! (Max 30 caractères)';
  }
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

// message d'erreur lorsque CategorieP iece saisi ne respecte pas les conditions prédifinis
MessageErreurCategoriePiece() {
  if (this.Informations_Generales_Form.get('Type_Piece_Identite').hasError('required')) {
    return 'Vous devez entrer le type de la piece Identité!';
  }
}
// message d'erreur lorsque le numero de piece d'identité saisi ne respecte pas les conditions prédifinis
MessageErreurNPieceIdentite() {
  if (this.Informations_Generales_Form.get('N_Piece_Identite').hasError('required')) {
    return 'Vous devez entrer le numéro de pièce identité!';
  }
  if (this.Informations_Generales_Form.get('N_Piece_Identite').hasError('minlength')) {
    return 'Numéro de pièce identité non valide! (Min 8 caractères)';
  }
  if (this.Informations_Generales_Form.get('N_Piece_Identite').hasError('maxlength')) {
    return 'Numéro de pièce identité non valide! (Max 15 caractères)';
  }
}

// message d'erreur lorsque banque saisi ne respecte pas les conditions prédifinis
MessageErreurBanque() {
  if (this.Informations_Banques_Form.get('Banque1').hasError('required')) {
    return 'Vous devez choisir une Banque!';
  }
}
// message d'erreur lorsque Rib1 saisi ne respecte pas les conditions prédifinis
MessageErreurRib() {
  if (this.Informations_Banques_Form.get('Rib1').hasError('required')) {
    return 'Vous devez entrer Rib';
  }
  if (this.Informations_Banques_Form.get('Rib1').hasError('minlength')) {
    return 'Rib non valide! (20 numéro)';
  }
  if (this.Informations_Banques_Form.get('Rib1').hasError('maxlength')) {
    return 'Rib non valide! (20 numéro)';
  }
}
// message d'erreur lorsque Contact saisi ne respecte pas les conditions prédifinis
MessageErreurContact() {
  if (this.Informations_Banques_Form.get('Contact').hasError('required')) {
    return 'Vous devez saisir un contact';
  }
 
}
// message d'erreur lorsque l'adresse saisi ne respecte pas les conditions prédifinis
MessageErreurAdresse() {
  if (this.Informations_Banques_Form.get('Adresse').hasError('required')) {
    return 'Vous devez entrer Adresse';
  }

}
// message d'erreur lorsque pays saisi ne respecte pas les conditions prédifinis
MessageErreurPays() {
  if (this.Informations_Banques_Form.get('Pays').hasError('required')) {
    return 'Vous devez choisir un  Pays!';
  }
}
// message d'erreur lorsque l'email' saisi ne respecte pas les conditions prédifinis
MessageErreurEmail() {
  if (this.Informations_Banques_Form.get('Email').hasError('required')) {
    return 'Vous devez saisir un  email!';
  }
  if (this.Informations_Banques_Form.get('Email').hasError('email')) {
    return 'saisir un email valide!';
  }
}
// message d'erreur lorsque tel saisi ne respecte pas les conditions prédifinis
MessageErreurTel() {
  if (this.Informations_Banques_Form.get('Tel1').hasError('required')) {
    return 'Vous devez saisir un  numéro du téléphone!';
  }
}
ngOnInit(): void {
}
// temps d'attente pour le traitement de fonction 
delai(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
}



@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class ModifierDialog {}