import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableFilter } from 'mat-table-filter';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
 

 interface table {
  id_employe : String;
  Lundi: string;
  Mardi: string;
  Mercredi: string;
  Jeudi: string;
  Vendredi: string;
}

interface filtres {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: table[] = [
  {id_employe:'1',Lundi: 'Jour travaillé', Mardi: 'Jour travaillé', Mercredi: 'Jour travaillé', Jeudi: 'Jour travaillé',Vendredi:'Jour travaillé'},
  {id_employe:'2',Lundi: 'Jour travaillé', Mardi: 'Jour travaillé', Mercredi: 'Jour travaillé', Jeudi: 'Jour travaillé',Vendredi:'Jour de congé'},
  {id_employe:'3',Lundi: 'Jour travaillé', Mardi: 'Jour travaillé', Mercredi: 'Jour travaillé', Jeudi: 'Jour d`arret maladie',Vendredi:'Jour d`arret maladie'},
  {id_employe:'4',Lundi: 'Absence', Mardi: 'Jour travaillé', Mercredi: 'Jour travaillé', Jeudi: 'Jour travaillé',Vendredi:'Jour travaillé'},

 
];

@Component({
  selector: 'app-lister-employe',
  templateUrl: './lister-pres.component.html',
  styleUrls: ['./lister-pres.component.scss'],
 
})

export class ListerPresComponent implements OnInit {

  liste_Filtres :filtres[] = [
    {value: 'id_employe-0', viewValue: 'id_employe'},
    {value: 'nom-1', viewValue: 'nom'},
  ];


  typeFiltre: MatTableFilter;
  entiterFiltre: any;
  Employes:  any ; 
  dataSource = new MatTableDataSource<table>(ELEMENT_DATA);
  displayedColumns: string[] =  ['Id_employe','Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi'];
  
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
     MatSnackBar, private http: HttpClient, private router: Router, public datepipe: DatePipe) {
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


}