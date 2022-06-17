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
  Salaire: string;
  Prime: string;
  Heures_supp: string;
  Heures_abs: string;
  
}

interface filtres {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: table[] = [
  {id_Employe: '1', Salaire: '3000', Prime: 'Prime de nuit', Heures_supp: '0',Heures_abs:'0'},
];

@Component({
  selector: 'app-lister-employe',
  templateUrl: './lister-bulletinpaie.component.html',
  styleUrls: ['./lister-bulletinpaie.component.scss'],
 
})

export class ListerBulletinComponent implements OnInit {




  liste_Filtres :filtres[] = [
    {value: 'id_employe-0', viewValue: 'id_employe'}
  ];


  typeFiltre: MatTableFilter;
  entiterFiltre: any;
  Employes:  any ; 
  dataSource = new MatTableDataSource<table>(ELEMENT_DATA);
  displayedColumns: string[] =  ['Image', 'id_Employe', 'Salaire', 'Prime', 'Heures_supp', 'Heures_abs',   'Supprimer'];
  
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
  
  constructor(private datePipe: DatePipe, private _snackBar:
     MatSnackBar,public dialog: MatDialog,public dialog1: MatDialog,
      private http: HttpClient, private router: Router, public datepipe: DatePipe) {
    this.ouvrirMessageChargement();
    sessionStorage.setItem('Utilisateur', "jouhaina");


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


  // generer PDF 
  genererPdf() {
    const dialogRef = this.dialog.open(PDFDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  supprimeremploye(){
    const dialogRef = this.dialog1.open(SupprimerDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-pdf.html',
})
export class PDFDialog {}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-supprimer.html',
})
export class SupprimerDialog {}