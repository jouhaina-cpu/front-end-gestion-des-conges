import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DepServiceService } from '../Service/dep-service.service';


 @Component({
  selector: 'app-ajout-employe',
  templateUrl: './ajout-dep.component.html',
  styleUrls: ['./ajout-dep.component.scss']
})

 
export class AjoutDepComponent  implements OnInit {

passage_etape = false;

Informations_Generales_Form: FormGroup;
Informations_Banques_Form: FormGroup;
Recapitulation_Form: FormGroup;

constructor(private http: HttpClient,public dialog: MatDialog, public service: DepServiceService, private fb: FormBuilder ,public datepipe: DatePipe) {

  this.Informations_Generales_Form = this.fb.group({
    Nom_Employe: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    Nom_Departement: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    Domaine: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    Role: ['', Validators.required],
    Description: [''],
    Effectif:[''],
  });
 
  this.Informations_Banques_Form = this.fb.group({
    Image: [''],
    Email: ['', [
      Validators.required,
      Validators.email,
    ]],
    Nom_Chef:[],
    Banque1: ['' ],
    Rib1: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20)]], 
    Adresse: ['', [Validators.required]], 
    Pays: ['', Validators.required],   
    Ville: [''],  
    Tel1: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    Cnss: [''],  
  });
  
  this.Recapitulation_Form = this.fb.group({});
  
  this.service.ListerPays().subscribe((reponse: Response) => {

    //this.categorie_pays = reponse;
  }); 
}


creeremploye() {
  const dialogRef = this.dialog.open(DialogContentExampleDialog);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

MessageErreurNomDep() {
  if (this.Informations_Generales_Form.get('Nom_Departement').hasError('required')) {
    return 'Vous devez entrer le nom du departement!';
  }

  if (this.Informations_Generales_Form.get('Nom_Departement').hasError('minlength')) {
    return 'Nom du departement non valide! (Min 3 caractères)';
  }
  if (this.Informations_Generales_Form.get('Nom_Departement').hasError('maxlength')) {
    return 'Nom du departement non valide! (Max 30 caractères)';
  }
}

MessageErreurDomaine() {
  if (this.Informations_Generales_Form.get('Domaine').hasError('required')) {
    return 'Vous devez entrer le domaine!';
  }

  if (this.Informations_Generales_Form.get('Domaine').hasError('minlength')) {
    return 'Domaine non valide! (Min 3 caractères)';
  }
  if (this.Informations_Generales_Form.get('Domaine').hasError('maxlength')) {
    return 'Domaine non valide! (Max 30 caractères)';
  }
}

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

MessageErreurNomChef() {
  if (this.Informations_Banques_Form.get('Nom_Chef').hasError('required')) {
    return 'Vous devez entrer le nom du chef d`equipe!';
  }

  if (this.Informations_Banques_Form.get('Nom_Chef').hasError('minlength')) {
    return 'Nom du chef d`equipe non valide! (Min 3 caractères)';
  }
  if (this.Informations_Banques_Form.get('Nom_Chef').hasError('maxlength')) {
    return 'Nom du chef d`equipe non valide! (Max 30 caractères)';
  }
}

MessageErreurEffectif() {
  if (this.Informations_Generales_Form.get('Effectif').hasError('required')) {
    return 'Vous devez entrer l`effectif de l`équipe!';
  }
}


MessageErreurAdresse() {
  if (this.Informations_Banques_Form.get('Adresse').hasError('required')) {
    return 'Vous devez entrer Adresse';
  }

}

MessageErreurEmail() {
  if (this.Informations_Banques_Form.get('Email').hasError('required')) {
    return 'Vous devez saisir un  email!';
  }
  if (this.Informations_Banques_Form.get('Email').hasError('email')) {
    return 'saisir un email valide!';
  }
}

MessageErreurTel() {
  if (this.Informations_Banques_Form.get('Tel1').hasError('required')) {
    return 'Vous devez saisir un  numéro du téléphone!';
  }
}

ngOnInit(): void {
}

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}