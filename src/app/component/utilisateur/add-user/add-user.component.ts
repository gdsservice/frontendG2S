import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {TypeAuth, UserModel, UserRole} from "../../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../popup-dialog/error-dialog/error-dialog.component";
import {ValidDialogComponent} from "../../popup-dialog/valid-dialog/valid-dialog.component";
import { Location } from '@angular/common';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{

  userListForm!: FormGroup;
  roleList: UserRole[] | any;
  hide = true;
  spinnerProgress: boolean = false;

  constructor(
              private route: Router,
              private snackBar: MatSnackBar,
              private location: Location,
              private fb: FormBuilder,
              private userService: UserService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
      this.userService.listeRole()
      .subscribe(
        data=>{this.roleList = data;
        },
        error => {
          // console.log(error)
        }
      )


    this.userListForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    })
  }


  ajoutUser() {
    if (this.userListForm.valid) {
      this.spinnerProgress = true;
      let user: UserModel = {
        id: null,
        nom: this.userListForm.value.nom,
        prenom: this.userListForm.value.prenom,
        email: this.userListForm.value.email,
        telephone: this.userListForm.value.telephone,
        password: this.userListForm.value.password,
        roles: [this.userListForm.value.role],
        activation: this.userListForm.value.activation,
        authentification: TypeAuth.FALSE,
      };
      this.userService.ajoutUser(user).subscribe({
        next: value => {
          this.spinnerProgress=false;
          this.snackBar.open('Utilisateur mis à jour avec succès!', 'Fermer', { duration: 3500 });
          this.route.navigateByUrl('/admin/utilisateur');
        },
        error: err => {
          // UtilisateurDuplicateException
          if (err.status === 409) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
          //  UtilisateurNotFoundException
          } else if(err.status === 404) {
            this.dialog.open(ErrorDialogComponent, {
              data: { message: err.error }
            });
            // EmailIncorrectException && EmptyException
          }else if(err.status === 400) {
            this.dialog.open(ErrorDialogComponent, {
              data: {message: err.error}
            });
          }else{
            // console.log(err);
          }
          this.spinnerProgress = false;
        }
      });
    } else {
      this.userListForm.markAllAsTouched();
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
    this.userListForm.get('telephone')?.setValue(input, { emitEvent: false });
  }


  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  retour() {
    this.location.back()
  }
}
