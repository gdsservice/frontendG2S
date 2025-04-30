import { Component } from '@angular/core';
import { DatePipe, Location } from "@angular/common";
import { VenteService } from '../../../services/vente.service';
import { FormGroup } from '@angular/forms';
import { VenteModel } from '../../../models/vente.model';
import { ActivatedRoute } from '@angular/router';
import { VenteDAOModel } from '../../../models/venteDAO.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-details-vente',
  templateUrl: './details-vente.component.html',
  styleUrl: './details-vente.component.css',
  providers: [DatePipe],

})
export class DetailsVenteComponent {

  vente!: VenteDAOModel;
  spinnerProgress: boolean = false;
  venteId: string | null = null;
  dataSource: any;
  displayedColumns = ['designation', 'quantite', 'prixUnitaire', 'montant', 'date', 'categorieStock', 'utilisateurProd'];
   

  constructor(
    private location: Location,
    private venteService: VenteService,
    private router: ActivatedRoute,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.venteId = this.router.snapshot.paramMap.get('idVente');
    if (this.venteId) {
      this.venteService.afficher(this.venteId).subscribe(
        (venteDAO: VenteDAOModel) => {
          this.vente = venteDAO;
          this.dataSource = new MatTableDataSource(this.vente.venteProduitList);
          // console.table(this.vente.venteProduitList);

        },
        error => {
          console.error('Erreur lors du chargement du vente:', error);
        }
      );
    }


  }

  imprimerVente() {
    this.venteService.telechargerPdf(this.venteId).subscribe((pdfBlob) => {
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }


  retour() {
    this.location.back();
  }

}
