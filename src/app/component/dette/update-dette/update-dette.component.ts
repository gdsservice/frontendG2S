import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProduitModel} from "../../../models/produit.model";
import {ClientModel} from "../../../models/client.model";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DetteService} from "../../../services/dette.service";
import {ProduitService} from "../../../services/produit.service";
import {ClientService} from "../../../services/client.service";
import {ApprovisionModel} from "../../../models/approvision.model";
import {DetteModel} from "../../../models/dette.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-dette',
  templateUrl: './update-dette.component.html',
  styleUrl: './update-dette.component.css'
})
export class UpdateDetteComponent implements OnInit{

  detteListForm!: FormGroup;
  spinnerProgress: boolean = false;
  detteId: string | null = null;

  constructor(
              private route: Router,
              private snackBar: MatSnackBar,
              private router: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              private detteService: DetteService,) {
    this.detteListForm = this.fb.group({
      titre: [''],
      quantite: [''],
      reduction: [''],
      dateDebut: [''],
      dateFin: [''],
      note: [''],
      produitDTOS: [],
      clientDTO: [],

    })
  }

  ngOnInit(): void {
    this.detteId = this.router.snapshot.paramMap.get('idDette');
    if (this.detteId) {
      this.detteService.afficher(this.detteId).subscribe(
        (dette: DetteModel) => {
          this.detteListForm.patchValue(dette);
        },
        error => {
          console.error('Erreur lors du chargement de dette:', error);
        }
      );
    }
  }

  retour() {
    this.location.back()
  }

  modifierDette() {
    // console.log(this.detteListForm)
    if (this.detteListForm.valid) {
      this.spinnerProgress=true;
      const dette: DetteModel = this.detteListForm.value;
      if (this.detteId) {
        dette.idDette = this.detteId
        this.detteService.modifierDette(dette).subscribe(
          () => {
            this.spinnerProgress=false;
            this.snackBar.open('Dette mis à jour avec succès!', 'Fermer', { duration: 3500 });
            this.route.navigateByUrl('/admin/dette');
          },
          error => {
            this.snackBar.open('Erreur lors de la mise à jour du dette.', 'Fermer', { duration: 3000 });
          }
        );
      }
    }
  }

}
