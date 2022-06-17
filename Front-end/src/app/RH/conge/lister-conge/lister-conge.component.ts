import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableFilter } from 'mat-table-filter';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
 
 interface table {
  id_Employe: string;
  Date_Deb  : String;
  Date_fin  : String;
  Description: String;
  Document_type: String;
  Etat         : String;
  Nbrjours     : String;
  Raison       : String;
  Type         : String;
}

interface filtres {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: table[] = [
  {id_Employe: '1', Date_Deb: '26/06/2022', Date_fin: '30/06/2022', Description: 'H',Document_type:'',Etat:'manouba',Nbrjours:'Vacance',Raison:'Voyage',Type:'Voyage'},

];

@Component({
  selector: 'app-lister-employe',
  templateUrl: './lister-conge.component.html',
  styleUrls: ['./lister-conge.component.scss'],
 
})

export class ListerCongeComponent implements OnInit {

  liste_Filtres :filtres[] = [
    {value: 'id_employe-0', viewValue: 'id_employe'},
    {value: 'Date_Deb-1', viewValue: 'Date_Deb'},
    {value: 'Date_fin-2', viewValue: 'Date_fin'}
  ];

  typeFiltre: MatTableFilter;
  entiterFiltre: any;
  Employes:  any ; 
  dataSource = new MatTableDataSource<table>(ELEMENT_DATA);
  displayedColumns: string[] =  ['Image', 'id_Employe', 'Type', 'Date_Deb','Date_fin','Supprimer'];
  
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
  
  constructor(private datePipe: DatePipe,public dialog: MatDialog, private _snackBar: MatSnackBar, private http: HttpClient, private router: Router, public datepipe: DatePipe) {
    this.ouvrirMessageChargement();
    sessionStorage.setItem('Utilisateur', "jouhaina");
  }

  openDialog() {
    const dialogRef = this.dialog.open(Dialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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


  ngOnInit(): void {
  }
  // temps d'attente avant transformation d'image
  delai(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class Dialog {}