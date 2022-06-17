import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { EmployeServiceService } from '../Service/employe-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WebRequestService } from 'src/app/web-request.service';
import { employe } from 'src/app/model/employe';
 
 interface Banque {
  value: string;
  viewValue: string;
}

interface piece
{
  value:string;
  viewValue:String;
}
interface Role {
  value: string;
  viewValue: string;
}

interface Localisation {
  value: string;
  viewValue: string;
}

interface Pays {
  value: string;
  viewValue: string;
}

interface Ville {
  value: string;
  viewValue: string;
}

 @Component({
  selector: 'app-ajout-employe',
  templateUrl: './ajout-employe.component.html',
  styleUrls: ['./ajout-employe.component.scss']
})

 
export class AjoutEmployeComponent  implements OnInit {


  categorie_banque : Banque[] = [
    {value: 'UIB-0', viewValue: 'UIB'},
    {value: 'Attijari-1', viewValue: 'Attijari Bank'},
    {value: 'BNA-2', viewValue: 'BNA'},
  ];

  categorie_piece : piece[]=[
    {value:'1',viewValue:'Carte d`identité'},
    {value:'2',viewValue:'Passeport'},
  ];
  roles : Role [] = [
    {value: 'ING-0', viewValue: 'Ingenieur'},
    {value: 'TECH-1', viewValue: 'Technicien'},
    {value: 'EXC-2', viewValue: 'Expert Comptable'},
    {value: 'CHAU-2', viewValue: 'Chauffeur'},
  ];

  locals : Localisation [] = [
    {value: 'CT-0', viewValue: 'Centre urbain Nord Tunis'},
    {value: 'ST-1', viewValue: 'Sousse Tunis'},
    {value: 'PF-2', viewValue: 'Paris France'},
    {value: 'TM-2', viewValue: 'tanger Maroc'},
  ];

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

//passage d'une étape à une autre uniquement si l'étape est validée 
passage_etape = false;
pays: string;
ville: string;
region: string;
categorie_region: any;
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
constructor(private http: HttpClient,private employeeService: WebRequestService,
  private router: Router, public dialog: MatDialog,public service: EmployeServiceService, private fb: FormBuilder ,public datepipe: DatePipe) {

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
    St_familliale: ['', Validators.required],   
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

   
  // récupérer la liste des categories banques 
  this.service.ListerBanques().subscribe((reponse: Response) => {

    //this.categorie_banque = reponse;
  });
  // récupérer la liste des pays
  this.service.ListerPays().subscribe((reponse: Response) => {

    //this.categorie_pays = reponse;
  }); 
}
employee : employe;

saveEmployee(){
  this.employeeService.createEmployee(this.employee).subscribe( data =>{
    console.log(data);
    this.goToEmployeeList();
  },
  error => console.log(error));
}

goToEmployeeList(){
  this.router.navigate(['/Lister-employee']);
}

onSubmit(){
  console.log(this.employee);
  this.saveEmployee();
}

ChoixBanque2(event: MatSelectChange){
  this.Informations_Banques_Form.controls.Rib2.enable();
}
// reactiver saisi rib1

ChoixBanque1(event: MatSelectChange){
  this.Informations_Banques_Form.controls.Rib1.enable();
}

// fonction activée lors de choix du pays pour récupérer la liste des villes dans ce dernier
ChoixPays(event: MatSelectChange) {
  this.pays = event.value;
  this.service.ListerVille(this.pays).subscribe((reponse: Response) => {
  this.Informations_Banques_Form.controls.ville.enable();
  });
}
// fonction activée lors de choix de la ville pour récupérer la liste des régions dans cette dernière
ChoixVille(event: MatSelectChange) {
  this.ville = event.value;
  this.service.ListerRegion(this.ville).subscribe((reponse: Response) => {
    this.categorie_region = reponse;
  });
}

openDialog()
{
  const dialogRef = this.dialog.open(CreerEmploye);

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
    return 'Vous devez entrer choisir le role !';
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
export class CreerEmploye {

  
}

