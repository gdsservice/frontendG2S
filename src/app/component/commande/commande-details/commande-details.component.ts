import { Component } from '@angular/core';
import { CommandeDAOModel } from '../../../models/commandeDAO.model';
import { CommandeService } from '../../../services/commande.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from "@angular/common";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-commande-details',
  templateUrl: './commande-details.component.html',
  styleUrl: './commande-details.component.css'
})
export class CommandeDetailsComponent {

  cdeID: string | null = null;
  commandeDAO: CommandeDAOModel | null = null; 
  dataSource: any;
  displayedColumns = ['designation','quantite', 'prixUnitaire', 'montant', 'date', 'categorieStock', 'utilisateurProd'];

  constructor(
    private commandeService: CommandeService,
    private router: ActivatedRoute,
    private location: Location,
  ){}

  ngOnInit(){
    this.cdeID = this.router.snapshot.paramMap.get("idCde");
    if(this.cdeID){
      this.commandeService.afficher(this.cdeID).subscribe(
        (commande : CommandeDAOModel) => {
          this.commandeDAO = commande;
          this.dataSource = new MatTableDataSource(this.commandeDAO.commandeProduitList); 
        }
      );
    }
  }

    imprimerVente() {

  }


  retour() {
    this.location.back();
  }

}
