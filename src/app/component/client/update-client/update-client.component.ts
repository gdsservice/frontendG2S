import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../services/client.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClientModel} from "../../../models/client.model";
import {StockModel} from "../../../models/stock.model";

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css'
})
export class UpdateClientComponent implements OnInit{

  clientListForm!: FormGroup;
  spinnerProgress: boolean = false;
  clientId: string | null = null;

  constructor(
              private clientService: ClientService,
              private route: Router,
              private snackBar: MatSnackBar,
              private router: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,) {
    this.clientListForm = this.fb.group({
      nom: [''],
      prenom: [''],
      adresse: [''],
      telephone: ['', Validators.required],
      email: [''],
    })
  }

  retour() {
    this.location.back()
  }

  ngOnInit(): void {
    this.clientId = this.router.snapshot.paramMap.get('idClient');
    if (this.clientId) {
      this.clientService.afficher(this.clientId).subscribe(
        (client: ClientModel) => {
          this.clientListForm.patchValue(client);
        },
        error => {
          console.error('Erreur lors du chargement du client:', error);
        }
      );
    } else {
      console.error('ID client est nul');
    }
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

  modifierClient() {
    if (this.clientListForm.valid) {
      this.spinnerProgress=true;
      const client: ClientModel = this.clientListForm.value;
      if (this.clientId) {
        client.idClient = this.clientId;
        this.clientService.modifierClient(client).subscribe(
          () => {
            this.spinnerProgress=false;
            this.snackBar.open('Client mis à jour avec succès!', 'Fermer', { duration: 3500 });
            this.route.navigateByUrl('/admin/client');
          },
          error => {
            this.spinnerProgress=false;
            this.snackBar.open('Erreur lors de la mise à jour du client.', 'Fermer', { duration: 3000 });
          }
        );
      }
    }
  }

}
