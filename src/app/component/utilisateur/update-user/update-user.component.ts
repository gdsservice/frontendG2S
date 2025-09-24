import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel, UserRole} from "../../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ProduitModel} from "../../../models/produit.model";
import {ErrorDialogComponent} from "../../popup-dialog/error-dialog/error-dialog.component";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {

  userListForm!: FormGroup;
  roleList: UserRole[] | any;
  hide = true;
  spinnerProgress: boolean = false;
  private userId: any;

  constructor(
    private route: Router,
    private routerActive: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog) {
    this.userListForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', Validators.required],
      role: [''],
    })
  }

  ngOnInit(): void {
    this.userService.listeRole()
      .subscribe(
        data => {
          this.roleList = data;
        },
        error => {
          // console.log(error)
        }
      )

    this.userId = this.routerActive.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.afficher(this.userId).subscribe(
        (user: UserModel) => {
          this.userListForm.patchValue(user);
        },
        error => {
          console.error('Erreur lors du chargement du user:', error);
        }
      );

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

  modifier() {
    if (this.userListForm.valid) {
      // console.log("PPPPPPPPPPPPPPPPPP")
      this.spinnerProgress=true;
      const user: UserModel = this.userListForm.value;
      if (this.userId) {
        user.id = this.userId;
        this.userService.modifier(user).subscribe(
          () => {
            this.spinnerProgress=false;
            this.snackBar.open('Utilisateur mis à jour avec succès!', 'Fermer', { duration: 3500 });
            this.route.navigateByUrl('/admin/utilisateur');
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
              // console.log(error);
            }
            this.spinnerProgress=false;
            this.snackBar.open('Erreur lors de la mise à jour du produit.', 'Fermer', { duration: 3000 });
          }
        );
      }
    }
  }
}




