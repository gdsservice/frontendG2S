import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VenteService} from "../../../services/vente.service";
import {VenteModel} from "../../../models/vente.model";
import {ErrorDialogComponent} from "../../popup-dialog/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update-vente',
  templateUrl: './update-vente.component.html',
  styleUrl: './update-vente.component.css'
})
export class UpdateVenteComponent implements OnInit{

  venteListForm!: FormGroup;
  spinnerProgress: boolean = false;
  venteId: string | null = null;

  constructor(
              private route: Router,
              private location: Location,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private venteService: VenteService,
              private router: ActivatedRoute)
              {
                this.venteListForm = this.fb.group({
                  description: [''],
                  montant: [''],
                  reduction: [''],
                  quantite: ['', Validators.required],
                  note: [''],
                  clientDTO: [],
                  produitsVend: [],
                })
              }

  ngOnInit(): void {
    // try
    // this.venteId = this.router.snapshot.paramMap.get('idVente');
    // if (this.venteId) {
    //     this.venteService.afficher(this.venteId).subscribe(
    //     (vente: VenteModel) => {
    //       this.venteListForm.patchValue(vente)
    //     },
    //     error => {
    //       console.error('Erreur lors du chargement du vente:', error);
    //     }
    //   );
    // }
  }

  modifierVente() {
    if (this.venteListForm.valid) {
      this.spinnerProgress=true;
      const vente: VenteModel = this.venteListForm.value;
      if (this.venteId) {
        vente.idVente = this.venteId;
        this.venteService.modifierVente(vente).subscribe(
          () => {
            this.spinnerProgress=false;
            this.snackBar.open('Vente mis à jour avec succès!', 'Fermer', { duration: 3000 });
            this.route.navigateByUrl('/admin/vente');
          },
          error => {
            if (error.status === 409) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
              //  EmptyException
            } else if(error.status === 404) {
              this.dialog.open(ErrorDialogComponent, {
                data: { message: error.error }
              });
            }else if(error.status === 400) {
              this.dialog.open(ErrorDialogComponent, {
                data: {message: error.error}
              });
            }else{
              console.log(error);
            }
            this.spinnerProgress=false;
            this.snackBar.open('Erreur lors de la mise à jour du vente.', 'Fermer', { duration: 3000 });
          }
        );
      }
    }
  }

  retour() {
    this.location.back()
  }
}
