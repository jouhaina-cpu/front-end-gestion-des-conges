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

 interface table {
  id_Employe: string;
  nom_Employe: string;
  prenom:string;
  dateA: string;
  dateS: string;
  
}

interface filtres {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: table[] = [
  {id_Employe: '1', nom_Employe: 'Hydrogen',prenom:'', dateA: '1.0079', dateS: 'H'},

];


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {

  liste_Filtres :filtres[] = [
    {value: 'id_employe-0', viewValue: 'id_employe'},
    {value: 'categorie_employe-1', viewValue: 'categorie_employe'},
    {value: 'email-2', viewValue: 'email'},
    {value: 'n_piece_identite-3', viewValue: 'n_piece_identite'},
    {value: 'nom-4', viewValue: 'nom'},
  ];


  typeFiltre: MatTableFilter;
  entiterFiltre: any;
  Employes:  any ; 
  dataSource = new MatTableDataSource<table>(ELEMENT_DATA);
  displayedColumns: string[] =  ['Image', 'id_Employe', 'nom','prenom', 'Date arrivée', 'Date de sortie'];
  
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
  

  constructor(private datePipe: DatePipe, private _snackBar: MatSnackBar, 
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
  }


  ngOnInit(): void {

  }

  // temps d'attente avant transformation d'image
  delai(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}