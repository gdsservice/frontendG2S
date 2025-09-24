import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { LoginService } from "../../services/login.service";
import { MatDrawer } from '@angular/material/sidenav';
import { CommandeDAOModel } from '../../models/commandeDAO.model';
import { lastValueFrom } from 'rxjs';
import { CommandeService } from '../../services/commande.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  @ViewChild('myDrawer') myDrawer!: MatDrawer;
  isMobile: boolean = false;
  commandeList: CommandeDAOModel[] = [];
  quantite: number = 0; 

  constructor(
              private breakpointObserver: BreakpointObserver,
              public authService: LoginService,
              private commandeService: CommandeService,
            ) { }

  async ngOnInit() {
    // Détecter si l'écran est de taille mobile
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
    
        const commandeData = await lastValueFrom(this.commandeService.listCommandeTraiter());
        if (commandeData) {
          this.commandeList = commandeData;
          if (this.commandeList.length > 0) {
          // Calculer la quantité totale de commandes dont traiter est false
          const commande = this.commandeList.filter(commande => commande.commande.traiter==false);
          this.quantite  = commande.length;
          }
        }
  }

  // Méthode pour fermer le drawer après la navigation
  closeDrawerOnNavigation() {
    if (this.isMobile) {
      this.myDrawer.close(); 
    }
  }

  public logout() {
    this.authService.logout();
  }
}