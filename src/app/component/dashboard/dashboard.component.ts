import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {VenteService} from "../../services/vente.service";
import {CategorieModel} from "../../models/categorie.model";
import {ClientService} from "../../services/client.service";
import {VenteModel} from "../../models/vente.model";
import { VenteDAOModel } from '../../models/venteDAO.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  totalVente!: number;
  totalClient!: number;
  listVente!: VenteDAOModel[];
  totalMontantVentes: number = 0;
  isLoading: boolean = true;

  constructor(private router: Router,
              private venteService: VenteService,
              private cientService: ClientService) {
  }

  ngOnInit(): void {
    this.venteService.totalVente()
      .subscribe(
        data =>{
          this.totalVente = data;
          // this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          // console.log(error)
        }
      )

    this.cientService.totalClient()
      .subscribe(
        data =>{
          this.totalClient = data;
        },
        error => {
          // console.log(error)
        }
      )

    this.venteService.listVente()
      .subscribe(
        data =>{
          this.listVente = data;
          this.calculateTotalMontant();  // Calculer le montant total ici
        },
        error => {
          // console.log(error)
        }
      )
  }

  calculateTotalMontant() {
    // this.totalMontantVentes = this.listVente.reduce((acc, vente) => acc + vente.montant, 0);
  }

  ajouterVente() {
    this.router.navigateByUrl("/admin/addVente")
  }
}
