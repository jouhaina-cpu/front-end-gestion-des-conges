import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { EmployeServiceService } from '../rh/employe/Service/employe-service.service';
import { MatDialog } from '@angular/material/dialog';


interface Pays {
  value: string;
  viewValue: string;
}

interface Ville {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rh',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  categorie_pays : Pays [] = [
    {value: 'TN-0', viewValue: 'Tunis'}
  ];

  categorie_ville : Ville[] = [
    {value: 'TN-00', viewValue: 'Tunis'},
    {value: 'TN-01', viewValue: 'Sfax'},
    {value: 'TN-02', viewValue: 'Sousse'},
    {value: 'TN-03', viewValue: 'Kairouan'},
    {value: 'TN-04', viewValue: 'Bizerte'},
    {value: 'TN-05', viewValue: 'Gabès'},
    {value: 'TN-06', viewValue: 'Ariana'},
    {value: 'TN-07', viewValue: 'Gafsa'},
    {value: 'TN-08', viewValue: 'Monastir'},
    {value: 'TN-09', viewValue: 'Ben Arous'},
    {value: 'TN-10', viewValue: 'Kasserine'},
    {value: 'TN-11', viewValue: 'Médenine'},
    {value: 'TN-12', viewValue: 'Nabeul'},
    {value: 'TN-13', viewValue: 'Tataouine'},
    {value: 'TN-14', viewValue: 'Béja'},
    {value: 'TN-15', viewValue: 'Le Kef'},
    {value: 'TN-16', viewValue: 'Mahdia'},
    {value: 'TN-17', viewValue: 'Sidi Bouzid'},
    {value: 'TN-18', viewValue: 'Jendouba'},
    {value: 'TN-19', viewValue: 'Tozeur'},
    {value: 'TN-20', viewValue: 'La Manouba'},
    {value: 'TN-22', viewValue: 'Siliana'},
    {value: 'TN-23', viewValue: 'Zaghouan'},
    {value: 'TN-24', viewValue: 'Kébili'}
  ];

passage_etape = false;
pays: string;
ville: string;
Informations_Generales_Form: FormGroup;
Informations_Banques_Form: FormGroup;
ContactForm: FormGroup;

constructor(private http: HttpClient, public dialog: MatDialog,public service: EmployeServiceService, private fb: FormBuilder ,public datepipe: DatePipe) {

  this.Informations_Generales_Form = this.fb.group({
    Nom_Employe: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    Prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  });

  this.Informations_Banques_Form = this.fb.group({
    Email: ['', [Validators.required,Validators.email,]],
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

  this.service.ListerCategoriePiece().subscribe((reponse: Response) => {

  });
}

ChoixPays(event: MatSelectChange) {
  this.pays = event.value;
  this.service.ListerVille(this.pays).subscribe((reponse: Response) => {
  this.Informations_Banques_Form.controls.ville.enable();
  });
}

ChoixVille(event: MatSelectChange) {
  this.ville = event.value;
  this.service.ListerRegion(this.ville).subscribe((reponse: Response) => {
  });
}

creeremploye()
{
  const dialogRef = this.dialog.open(Modification);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

MessageErreurPrenom() {
  if (this.Informations_Generales_Form.get('Prenom').hasError('required')) {
    return 'Vous devez entrer le prenom du Employe!';
  }

  if (this.Informations_Generales_Form.get('Prenom').hasError('minlength')) {
    return 'Prenom non valide! (Min 3 caractères)';
  }
  if (this.Informations_Generales_Form.get('Prenom').hasError('maxlength')) {
    return 'Prenom non valide! (Max 30 caractères)';
  }
}

MessageErreurContact() {
  if (this.Informations_Banques_Form.get('Contact').hasError('required')) {
    return 'Vous devez saisir un contact';
  }
 
}

MessageErreurAdresse() {
  if (this.Informations_Banques_Form.get('Adresse').hasError('required')) {
    return 'Vous devez entrer Adresse';
  }

}

MessageErreurPays() {
  if (this.Informations_Banques_Form.get('Pays').hasError('required')) {
    return 'Vous devez choisir un  Pays!';
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
export class Modification{}