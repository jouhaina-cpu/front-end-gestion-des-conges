import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableFilter } from 'mat-table-filter';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { employe } from 'src/app/model/employe';
import { WebRequestService } from 'src/app/web-request.service';

 interface table {
  id_Employe: string;
  nom_Employe: string;
  prenom:string;
  role: string;
}

interface filtres {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: table[] = [

];

@Component({
  selector: 'app-lister-employe',
  templateUrl: './lister-employe.component.html',
  styleUrls: ['./lister-employe.component.scss'],
 
})

export class ListerEmployeComponent implements OnInit {

  liste_Filtres :filtres[] = [
    {value: 'id_employe-0', viewValue: 'id_employe'},
    {value: 'categorie_employe-1', viewValue: 'categorie_employe'},
    {value: 'email-2', viewValue: 'email'},
    {value: 'n_piece_identite-3', viewValue: 'n_piece_identite'},
    {value: 'nom-4', viewValue: 'nom'},
    {value: 'rib-5', viewValue: 'rib'},
  ];

  Employes: employe[];

  typeFiltre: MatTableFilter;
  entiterFiltre: any;

  dataSource = new MatTableDataSource<table>();
  displayedColumns: string[] =  ['Image', 'id_Employe', 'nom', 'prenom', 'role',   'Supprimer'];
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  contenu_developper: any | null;
  detail: any;
  recherche: any;
  valeurRecherche: string = '';
  filtre = '';
  base64Image: any;
  modele: any;
  modeleSrc: any;
  chargementEnCours: any;
 
  date:any;

  constructor(private datePipe: DatePipe,public dialog1: MatDialog,private route: ActivatedRoute,private employeeService: WebRequestService,
    public dialog: MatDialog, private _snackBar: MatSnackBar,
     private http: HttpClient, private router: Router, public datepipe: DatePipe) {
    this.ouvrirMessageChargement();
    sessionStorage.setItem('Utilisateur', "jouhaina");
  }

  openDialog(id:number) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){ this.deleteEmployee(id);}
    });
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  
  // message indiquant chargement de page
  ouvrirMessageChargement() {
    this._snackBar.open('1 seconde', '', {
      duration: 100,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
 
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // récuperer valeur du filtre choisi
  ChoixFiltre(event: MatSelectChange) {
    this.filtre = event.value;
    this.valeurRecherche = '';
  }
  //filtrer la liste du fournisseur
  filtrer() {
    if (this.filtre == '') {
      Swal.fire({
        icon: 'error',
        text: 'Vous devez choisir un filtre de recherche!'
      }
      )
    }
    else if (this.valeurRecherche == '') {
      Swal.fire({
        icon: 'error',
        text: 'Vous n' + "'" + 'avez pas saisi une valeur de recherche!'
      }
      )
    }
    else if (this.valeurRecherche == null) {
      Swal.fire({
        icon: 'error',
        text: 'Vous n' + "'" + 'avez pas saisi une valeur de recherche!'
      }
      )
    }
  }

  private getEmployees(){
    this.employeeService.get().subscribe(data => {
      this.Employes = data;
    });
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      this.getEmployees();
    })
  }

  ngOnInit(): void {
    this.employeeService.get().subscribe(data => {
      this.Employes = data;
    });
  }
  // temps d'attente avant transformation d'image
  delai(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // generer PDF 
  genererPdf() {
    const dialogRef = this.dialog1.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent {}