import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {TypeRole, TypeActive, UserModel, UserRole} from "../../models/user.model";
import {
  ConfirmationDialogSuppVenteComponent
} from "../popup-dialog/confirmation-dialog-supp-vente/confirmation-dialog-supp-vente.component";
import {ErrorDialogComponent} from "../popup-dialog/error-dialog/error-dialog.component";
import {
  ConfirmationDialogSuppUserComponent
} from "../popup-dialog/confirmation-dialog-supp-user/confirmation-dialog-supp-user.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit{

  public listUser: Array<UserModel> = [];
  spinnerProgress: boolean = false;

  constructor(
              private userService: UserService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.listeUser()
      .subscribe(
        data=>{
           this.listUser = data;
        },
        error => {
          // console.log(error)
        }
      )
  }

  onToggleChange(user: UserModel | any, event: any) {
    user.activation = event.checked;
  }

  ajouter() {
    this.router.navigateByUrl("/admin/addUser")
  }

    modifier(id: number | null) {
      this.router.navigateByUrl(`/admin/updateUser/${id}`)
    }

  supprimer(user: UserModel) {
    const dialogRef = this.dialog.open(ConfirmationDialogSuppUserComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.spinnerProgress= true;
        this.userService.supprimer(user.id).subscribe(
          response => {
            this.spinnerProgress= false;
            this.ngOnInit();
            this.snackBar.open('Utilisateur supprimer avec succès!', 'Fermer', { duration: 3500 });
            this.router.navigateByUrl("/admin/utilisateur");
          },
          error => {
            if(error.status === 400){
              this.spinnerProgress= false;
              this.dialog.open(ErrorDialogComponent, {
                data: {message: error.error}
              });
            }else if(error.status === 404){
              this.spinnerProgress= false;
              this.dialog.open(ErrorDialogComponent, {
                data: {message: error.error}
              });
            }
          }
        );
      }
    })
  }

  detail(user: UserModel) {

  }
}
