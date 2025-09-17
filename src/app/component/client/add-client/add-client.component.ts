import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { TypeAuth, UserModel } from "../../../models/user.model";
import { ValidDialogComponent } from "../../popup-dialog/valid-dialog/valid-dialog.component";
import { ErrorDialogComponent } from "../../popup-dialog/error-dialog/error-dialog.component";
import { ClientModel } from "../../../models/client.model";
import { ClientService } from "../../../services/client.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent implements OnInit {

  clientListForm!: FormGroup;
  spinnerProgress: boolean = false;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private route: Router,
    private location: Location,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,) {
  }

  retour() {
    this.location.back()
  }

  ngOnInit(): void {
    this.clientListForm = this.fb.group({
      nom: [''],
      prenom: [''],
      adresse: [''],
      telephone: ['', Validators.required],
      email: [''],

    })
  }

  formatTelephone(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 8) {
      input = input.substring(0, 8);
    }
    if (input.length > 0) {
      input = input.match(/.{1,2}/g)?.join('-') || input;
    }
    this.clientListForm.get('telephone')?.setValue(input, { emitEvent: false });
  }

  ajoutClient() {
    if (this.clientListForm.valid) {
      this.spinnerProgress = true;
      let client: ClientModel = {
        idClient: null,
        nom: this.clientListForm.value.nom,
        prenom: this.clientListForm.value.prenom,
        email: this.clientListForm.value.email,
        telephone: this.clientListForm.value.telephone,
        adresse: this.clientListForm.value.adresse,
        dateAjout: null
      };
      this.clientService.ajoutClient(client).subscribe({
        next: value => {
          this.spinnerProgress = false;
          this.snackBar.open('Client enregistre avec succès!', 'Fermer', { duration: 3500 });
          this.route.navigateByUrl("/admin/client");
        },
        error: err => {
          // ClientDuplicateException
          if (err.status === 409) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            //  ClientNotFoundException
          } else if (err.status === 404) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            // EmailIncorrectException && EmptyException
          } else if (err.status === 400) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
          } else {
            // console.log(err);
          }
          this.spinnerProgress = false;
        }
      });
    } else {
      this.clientListForm.markAllAsTouched();
    }
  }

  annuler() {
    this.clientListForm = this.fb.group({
      nom: [''],
      prenom: [''],
      adresse: [''],
      telephone: [''],
      email: [''],

    })
  }
}
